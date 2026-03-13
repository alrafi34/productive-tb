const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN",
  "CROSS JOIN", "ON", "AND", "OR", "NOT", "IN", "EXISTS", "BETWEEN", "LIKE",
  "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "UNION", "UNION ALL",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE",
  "ALTER", "DROP", "TRUNCATE", "CASE", "WHEN", "THEN", "ELSE", "END",
  "DISTINCT", "AS", "WITH", "RECURSIVE", "CAST", "COALESCE", "NULLIF"
];

const OPERATORS = ["=", "<>", "!=", "<", ">", "<=", ">=", "+", "-", "*", "/", "%"];

export function formatSQL(
  input: string,
  dialect: string = "generic",
  uppercase: boolean = true,
  alignColumns: boolean = true
): string {
  if (!input.trim()) return "";

  let sql = input.trim();
  sql = sql.replace(/\s+/g, " ");

  const keywords = uppercase ? SQL_KEYWORDS : SQL_KEYWORDS.map(k => k.toLowerCase());
  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

  let formatted = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";
  let i = 0;

  while (i < sql.length) {
    const char = sql[i];
    const nextChars = sql.substring(i, i + 10).toUpperCase();

    if ((char === "'" || char === '"') && (i === 0 || sql[i - 1] !== "\\")) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
      formatted += char;
      i++;
      continue;
    }

    if (inString) {
      formatted += char;
      i++;
      continue;
    }

    if (nextChars.startsWith("SELECT")) {
      formatted = formatted.trimEnd() + "\nSELECT\n  ";
      i += 6;
      depth++;
    } else if (nextChars.startsWith("FROM")) {
      formatted = formatted.trimEnd() + "\nFROM ";
      i += 4;
      depth = Math.max(0, depth - 1);
    } else if (nextChars.startsWith("WHERE")) {
      formatted = formatted.trimEnd() + "\nWHERE ";
      i += 5;
    } else if (nextChars.startsWith("JOIN")) {
      formatted = formatted.trimEnd() + "\nJOIN ";
      i += 4;
    } else if (nextChars.startsWith("LEFT JOIN")) {
      formatted = formatted.trimEnd() + "\nLEFT JOIN ";
      i += 9;
    } else if (nextChars.startsWith("RIGHT JOIN")) {
      formatted = formatted.trimEnd() + "\nRIGHT JOIN ";
      i += 10;
    } else if (nextChars.startsWith("INNER JOIN")) {
      formatted = formatted.trimEnd() + "\nINNER JOIN ";
      i += 10;
    } else if (nextChars.startsWith("ON")) {
      formatted = formatted.trimEnd() + "\n  ON ";
      i += 2;
    } else if (nextChars.startsWith("AND")) {
      formatted = formatted.trimEnd() + "\n  AND ";
      i += 3;
    } else if (nextChars.startsWith("OR")) {
      formatted = formatted.trimEnd() + "\n  OR ";
      i += 2;
    } else if (nextChars.startsWith("GROUP BY")) {
      formatted = formatted.trimEnd() + "\nGROUP BY ";
      i += 8;
    } else if (nextChars.startsWith("ORDER BY")) {
      formatted = formatted.trimEnd() + "\nORDER BY ";
      i += 8;
    } else if (nextChars.startsWith("HAVING")) {
      formatted = formatted.trimEnd() + "\nHAVING ";
      i += 6;
    } else if (nextChars.startsWith("LIMIT")) {
      formatted = formatted.trimEnd() + "\nLIMIT ";
      i += 5;
    } else if (nextChars.startsWith("UNION")) {
      formatted = formatted.trimEnd() + "\nUNION\n";
      i += 5;
    } else if (char === ",") {
      formatted += ",\n  ";
      i++;
    } else if (char === "(") {
      formatted += "(";
      depth++;
      i++;
      if (sql[i] && sql[i] !== " ") {
        const nextWord = sql.substring(i).match(/^[A-Za-z_]/);
        if (nextWord && nextChars.substring(1).match(/^SELECT/i)) {
          formatted += "\n" + "  ".repeat(depth);
        }
      }
    } else if (char === ")") {
      depth = Math.max(0, depth - 1);
      formatted = formatted.trimEnd() + "\n" + "  ".repeat(depth) + ")";
      i++;
    } else if (char === " " && formatted.endsWith(" ")) {
      i++;
    } else {
      formatted += char;
      i++;
    }
  }

  formatted = formatted.replace(/\n\s+\n/g, "\n");
  formatted = formatted.replace(/\n\s*,/g, ",");

  if (alignColumns) {
    formatted = alignSelectColumns(formatted, uppercase);
  }

  return formatted.trim();
}

function alignSelectColumns(sql: string, uppercase: boolean): string {
  const lines = sql.split("\n");
  const result: string[] = [];
  let inSelect = false;
  let selectColumns: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.toUpperCase().startsWith("SELECT")) {
      inSelect = true;
      result.push(line);
      continue;
    }

    if (inSelect && (line.toUpperCase().startsWith("FROM") || 
        line.toUpperCase().startsWith("WHERE") ||
        line.toUpperCase().startsWith("GROUP") ||
        line.toUpperCase().startsWith("ORDER") ||
        line.toUpperCase().startsWith("LIMIT") ||
        line.toUpperCase().startsWith("UNION"))) {
      inSelect = false;
      result.push(line);
      continue;
    }

    if (inSelect && line) {
      result.push("  " + line);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

export function minifySQL(input: string): string {
  if (!input.trim()) return "";
  return input.replace(/\s+/g, " ").trim();
}

export function analyzeSQL(input: string): {
  characterCount: number;
  lineCount: number;
  wordCount: number;
  keywordCount: number;
  size: string;
} {
  const characterCount = input.length;
  const lineCount = input.split("\n").length;
  const wordCount = input.split(/\s+/).filter(w => w.length > 0).length;
  
  const keywordRegex = new RegExp(`\\b(${SQL_KEYWORDS.join("|")})\\b`, "gi");
  const keywordMatches = input.match(keywordRegex) || [];
  const keywordCount = keywordMatches.length;

  const sizeInBytes = new Blob([input]).size;
  const size = sizeInBytes > 1024 ? `${(sizeInBytes / 1024).toFixed(2)} KB` : `${sizeInBytes} B`;

  return {
    characterCount,
    lineCount,
    wordCount,
    keywordCount,
    size
  };
}

export function saveToHistory(sql: string): void {
  try {
    const history = JSON.parse(localStorage.getItem("sqlFormatterHistory") || "[]");
    const entry = {
      sql: sql.substring(0, 100),
      timestamp: new Date().toISOString(),
      fullSql: sql
    };

    history.unshift(entry);
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("sqlFormatterHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): Array<{ sql: string; timestamp: string; fullSql: string }> {
  try {
    return JSON.parse(localStorage.getItem("sqlFormatterHistory") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("sqlFormatterHistory");
}

export const EXAMPLE_QUERIES = {
  simple: "select id,name,email from users where age>18 and status='active' order by created_at desc",
  join: "select u.id,u.name,o.total from users u join orders o on u.id=o.user_id where o.total>100",
  subquery: "select name from users where id in(select user_id from orders where total>500)",
  aggregate: "select department,count(*) as emp_count,avg(salary) as avg_salary from employees group by department having count(*)>5",
  complex: "select u.id,u.name,count(o.id) as order_count,sum(o.total) as total_spent from users u left join orders o on u.id=o.user_id where u.created_at>'2023-01-01' group by u.id,u.name having count(o.id)>0 order by total_spent desc limit 10"
};
