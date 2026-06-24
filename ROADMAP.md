# Lalla AI — Roadmap to a real clinical tool

This document is honest about the gap between a consumer awareness app and a tool that **helps doctors diagnose patients**. The latter is a regulated **medical device** (SaMD — Software as a Medical Device). This roadmap separates what is achievable now (no regulation) from what requires a clinical/regulatory program.

---

## Where we are today (v3) — patient-facing awareness

- Interactive **3D self-exam guide** (`/check`)
- **Mammogram / BI-RADS density simulator** — *synthetic, educational* (`/screening`)
- **Camera visual self-check** — on-device, private, no diagnosis (`/visual`)
- **AI companion** chat + risk-awareness quiz
- **Clinician decision-support** tools — BI-RADS report builder + risk-factor profiler (`/clinician`)
- A **real, trained ML model** (research demo) on the Wisconsin Breast Cancer Diagnostic dataset (`python-fallback/`) — ROC-AUC ≈ 0.998, clearly labeled *not for clinical use*

Everything above is **honest and non-diagnostic by design.**

---

## Phase 1 — Real ML, as research (✅ started)

**Goal:** prove genuine ML capability without claiming clinical use.

- [x] Train a real classifier on a public clinical dataset (Wisconsin Diagnostic — FNA features). Metrics: accuracy 98.6%, ROC-AUC 0.998, sensitivity 98%, specificity 99%.
- [x] Explainability (feature importance) + ROC / confusion-matrix.
- [ ] **Image-based model:** transfer-learning CNN (e.g. EfficientNet) on a public **mammogram** dataset — **RSNA Breast Cancer Detection** (Kaggle), **CBIS-DDSM**, **VinDr-Mammo**, or **INbreast** (DICOM).
- [ ] **Grad-CAM heatmaps** to show *where* the model looks (clinician trust).
- [ ] Report sensitivity/specificity **at a fixed operating point**, plus calibration. Deploy on **Hugging Face Spaces** / **Streamlit Cloud**.

> Framing everywhere: *"Research demonstration — not a medical device, not for clinical use."*

## Phase 2 — Clinician decision-support (✅ started, no regulation)

Tools that assist workflow without interpreting images or diagnosing:

- [x] **BI-RADS structured-report builder** (ACR categories + management).
- [x] **Risk-factor profiler** (educational; links to the validated NCI / Tyrer-Cuzick tools).
- [ ] Implement a **validated risk model** properly (Gail / Tyrer-Cuzick / BOADICEA) with citations.
- [ ] **Patient intake → structured chart summary** (multilingual symptom capture summarized for the clinician).
- [ ] **Follow-up / recall scheduling** aligned to BI-RADS 3 (6-month) etc.

## Phase 3 — Toward a regulated diagnostic aid (the real-world product)

This is a multi-year, funded, team effort — listed so the path is clear:

1. **Clinical partner + data access** — annotated DICOM mammograms with **biopsy-proven** outcomes; ethics/IRB approval; de-identification.
2. **Intended use statement** — e.g. *concurrent reader / CADe* (computer-aided detection) flagging suspicious regions, **not** autonomous diagnosis.
3. **Quality system** — ISO 13485 (QMS), ISO 14971 (risk management), IEC 62304 (software lifecycle).
4. **Clinical validation** — retrospective then **prospective** reader studies; report AUC, sensitivity/specificity vs. radiologists, sub-group fairness.
5. **Regulatory submission** — FDA 510(k)/De Novo (US), **CE mark under EU MDR** (Class IIa/IIb), local equivalents.
6. **Privacy & security** — HIPAA (US), GDPR (EU); audit logging; PHI handling.
7. **Post-market surveillance** — monitoring, drift detection, incident reporting.
8. **Liability & integration** — malpractice/insurance, PACS/RIS integration, clinician override.

### Reference products (the bar)
Lunit INSIGHT MMG · iCAD ProFound AI · Kheiron Mia · Therapixel MammoScreen · ScreenPoint Transpara — all CE/FDA-cleared, trained on millions of scans, validated in clinical studies.

---

## Guardrails (non-negotiable)

- **Never claim to diagnose.** Consumer features stay educational; clinician features stay decision-*support*.
- **No "scan a photo for cancer."** No validated technology detects breast cancer from a phone photo; claiming it endangers users.
- **Every medical surface** carries a clear disclaimer and points to a professional.
- **Cite sources** (ACR BI-RADS, ACS/ACOG, WHO, NCI).
