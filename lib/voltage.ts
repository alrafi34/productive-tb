/*
 * Nominal single-phase mains voltage, guessed from the visitor's timezone for
 * a default that always stays editable: 120 V in North America, 230 V in the
 * UK, Europe, Australia and most other countries (IEC 60038).
 */
export function guessMainsVoltage(): 120 | 230 {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (zone.startsWith("America/")) return 120;
  } catch {
    // fall through
  }
  return 230;
}
