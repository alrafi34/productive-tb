/* Body measurements carried between the health calculators (BMI, BMR,
   ideal weight, daily calories, macros). Each tool keeps metric (cm, kg)
   and imperial (ft + in, lb) fields side by side, so the unit travels with
   the matching values and a receiver fills only that unit's fields. */

export type BodyUnit = "metric" | "imperial";
export type BodySex = "male" | "female";

export interface Body {
  unit: BodyUnit;
  sex?: BodySex;
  age?: number;
  cm?: number;
  kg?: number;
  ft?: number;
  inch?: number;
  lb?: number;
}

const num = (s: string | null | undefined) => {
  if (s === null || s === undefined || String(s).trim() === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

/* Query string for a body, or null when height or weight for the unit is missing */
export function bodyQuery(b: {
  unit: BodyUnit; sex?: string; age?: string;
  cm?: string; kg?: string; ft?: string; inch?: string; lb?: string;
}): URLSearchParams | null {
  const q = new URLSearchParams({ unit: b.unit });
  if (b.unit === "metric") {
    const cm = num(b.cm), kg = num(b.kg);
    if (!(cm && cm > 0) || !(kg && kg > 0)) return null;
    q.set("cm", String(cm)); q.set("kg", String(kg));
  } else {
    const ft = num(b.ft), inch = num(b.inch) ?? 0, lb = num(b.lb);
    if (!(ft !== undefined && ft >= 1) || !(inch >= 0 && inch < 12) || !(lb && lb > 0)) return null;
    q.set("ft", String(ft)); q.set("in", String(inch)); q.set("lb", String(lb));
  }
  if (b.sex === "male" || b.sex === "female") q.set("sex", b.sex);
  const age = num(b.age);
  if (age !== undefined && age > 0 && age < 120) q.set("age", String(age));
  return q;
}

/* Reads a carried body from the URL; null unless the unit and a complete
   height and weight for it are present and plausible */
export function readBody(q: URLSearchParams | null): Body | null {
  if (!q) return null;
  const unit = q.get("unit");
  const sexRaw = q.get("sex");
  const sex = sexRaw === "male" || sexRaw === "female" ? sexRaw : undefined;
  const ageN = num(q.get("age"));
  const age = ageN !== undefined && ageN > 0 && ageN < 120 ? ageN : undefined;
  if (unit === "metric") {
    const cm = num(q.get("cm")), kg = num(q.get("kg"));
    if (!(cm && cm > 0 && cm < 300) || !(kg && kg > 0 && kg < 700)) return null;
    return { unit, sex, age, cm, kg };
  }
  if (unit === "imperial") {
    const ft = num(q.get("ft")), inch = num(q.get("in")) ?? 0, lb = num(q.get("lb"));
    if (!(ft !== undefined && ft >= 1 && ft < 10) || !(inch >= 0 && inch < 12) || !(lb && lb > 0 && lb < 1500)) return null;
    return { unit, sex, age, ft, inch, lb };
  }
  return null;
}
