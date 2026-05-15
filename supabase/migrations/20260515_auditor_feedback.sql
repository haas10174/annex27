-- ─────────────────────────────────────────────────────────────────────────
-- auditor_feedback — learning store voor de AI-draft pipeline
-- Elke keer dat Lead Auditor een AI-draft accept/edit/reject → snapshot
-- van zowel draft als final. Wordt in volgende generate-findings-draft
-- runs als few-shot context aan Claude meegegeven om diens output te kalibreren.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.auditor_feedback (
  id                     uuid primary key default gen_random_uuid(),
  auditor_id             uuid references auth.users(id),
  klant_user_id          uuid references auth.users(id) on delete cascade,
  control_id             text not null,
  klant_sector           text,
  draft_severity         text,
  draft_finding          text,
  draft_recommendation   text,
  draft_confidence       numeric(3,2),
  final_severity         text,
  final_finding          text,
  final_recommendation   text,
  action                 text not null check (action in ('accepted','edited','rejected')),
  diff_reason            text default '',
  created_at             timestamptz not null default now()
);

create index if not exists idx_auditor_feedback_control on public.auditor_feedback(control_id, created_at desc);
create index if not exists idx_auditor_feedback_auditor on public.auditor_feedback(auditor_id, created_at desc);

alter table public.auditor_feedback enable row level security;

drop policy if exists "admin all on auditor_feedback" on public.auditor_feedback;
create policy "admin all on auditor_feedback"
  on public.auditor_feedback
  for all
  using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role' in ('admin','auditor')
             or u.raw_app_meta_data->>'pakket' = 'admin')
    )
  )
  with check (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role' in ('admin','auditor')
             or u.raw_app_meta_data->>'pakket' = 'admin')
    )
  );

comment on table public.auditor_feedback is
  'Snapshot van AI-draft + Lead Auditor finale beslissing per control. Wordt gebruikt als few-shot training in generate-findings-draft.';
comment on column public.auditor_feedback.action is
  'accepted = AI-draft ongewijzigd doorgezet · edited = auditor heeft tekst/severity aangepast · rejected = verworpen';
comment on column public.auditor_feedback.diff_reason is
  'Optionele toelichting van de auditor waarom de AI-draft werd gewijzigd.';
