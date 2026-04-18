// Extract controls + clauseControls + specificQuestions uit dashboard.html naar JSON
const fs = require('fs');
const html = fs.readFileSync('dashboard.html', 'utf8');

// Helper om JS-literal-blok te evalueren
function extractBlock(marker, endPattern) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('Marker niet gevonden: ' + marker);
  // Find end (next ^]; or ^};)
  const after = html.substring(start);
  const endMatch = after.match(endPattern);
  if (!endMatch) throw new Error('Einde niet gevonden voor ' + marker);
  return after.substring(0, endMatch.index + endMatch[0].length);
}

// Extract controls array
const controlsBlock = extractBlock('const controls = [', /\n\];\n/);
// Extract clauseControls
const clauseBlock = extractBlock('const clauseControls = [', /\n\];\n/);
// Extract specificQuestions
const specificBlock = extractBlock('const specificQuestions = {', /\n\};\n/);

// Eval in safe scope
const scope = {};
new Function('scope', `
  ${controlsBlock}
  ${clauseBlock}
  ${specificBlock}
  scope.controls = controls;
  scope.clauseControls = clauseControls;
  scope.specificQuestions = specificQuestions;
`)(scope);

// Build effective questions per control
const allControls = [...scope.controls, ...scope.clauseControls];
const questionsByControl = {};
for (const ctrl of allControls) {
  const specific = scope.specificQuestions[ctrl.id];
  if (specific) {
    questionsByControl[ctrl.id] = { name: ctrl.name, cat: ctrl.cat, questions: specific, source: 'specific' };
  } else {
    questionsByControl[ctrl.id] = {
      name: ctrl.name,
      cat: ctrl.cat,
      questions: [
        { q: `Is ${ctrl.name.toLowerCase()} formeel gedocumenteerd en goedgekeurd?`, type: 'doc' },
        { q: `Wordt ${ctrl.name.toLowerCase()} actief toegepast en periodiek geëvalueerd?`, type: 'impl' }
      ],
      source: 'default'
    };
  }
}

const out = {
  total_controls: allControls.length,
  total_specific: Object.keys(scope.specificQuestions).length,
  total_default: allControls.length - Object.keys(scope.specificQuestions).length,
  by_control: questionsByControl
};

fs.writeFileSync('.tmp_gap_questions.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote gap questions:', {
  total: allControls.length,
  specific: Object.keys(scope.specificQuestions).length,
  default: allControls.length - Object.keys(scope.specificQuestions).length
});
