export function parseXML(xmlText: string): { success: boolean; error?: string; doc?: Document } {
  if (!xmlText.trim()) {
    return { success: false, error: "XML input is empty" };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "application/xml");
    
    if (doc.getElementsByTagName("parsererror").length > 0) {
      const errorNode = doc.getElementsByTagName("parsererror")[0];
      return { success: false, error: errorNode.textContent || "Invalid XML" };
    }
    
    return { success: true, doc };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to parse XML" };
  }
}

export function xmlToJson(node: Node, options: { includeAttributes: boolean; detectArrays: boolean }): any {
  if (node.nodeType === 3) {
    const text = (node as Text).nodeValue?.trim();
    return text || null;
  }

  if (node.nodeType !== 1) return null;

  const element = node as Element;
  const obj: any = {};

  // Handle attributes
  if (options.includeAttributes && element.attributes.length > 0) {
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      obj[`@${attr.name}`] = attr.value;
    }
  }

  // Handle child nodes
  const childMap: { [key: string]: any[] } = {};
  let hasTextContent = false;
  let textContent = "";

  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];

    if (child.nodeType === 3) {
      const text = (child as Text).nodeValue?.trim();
      if (text) {
        hasTextContent = true;
        textContent += text;
      }
    } else if (child.nodeType === 1) {
      const childElement = child as Element;
      const childName = childElement.nodeName;
      const childJson = xmlToJson(child, options);

      if (!childMap[childName]) {
        childMap[childName] = [];
      }
      childMap[childName].push(childJson);
    }
  }

  // Add text content
  if (hasTextContent && Object.keys(childMap).length === 0) {
    return textContent;
  }

  if (hasTextContent && Object.keys(childMap).length > 0) {
    obj["#text"] = textContent;
  }

  // Add child elements
  for (const [key, values] of Object.entries(childMap)) {
    if (options.detectArrays && values.length > 1) {
      obj[key] = values;
    } else if (values.length === 1) {
      obj[key] = values[0];
    } else {
      obj[key] = values;
    }
  }

  return obj;
}

export function convertXmlToJson(
  xmlText: string,
  options: { includeAttributes: boolean; detectArrays: boolean; prettyPrint: boolean }
): { success: boolean; output?: string; error?: string } {
  const parseResult = parseXML(xmlText);
  
  if (!parseResult.success) {
    return { success: false, error: parseResult.error };
  }

  try {
    const doc = parseResult.doc!;
    const root = doc.documentElement;
    const json = { [root.nodeName]: xmlToJson(root, { includeAttributes: options.includeAttributes, detectArrays: options.detectArrays }) };
    
    const output = options.prettyPrint
      ? JSON.stringify(json, null, 2)
      : JSON.stringify(json);
    
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Conversion failed" };
  }
}

export function saveToHistory(xml: string): void {
  try {
    const history = JSON.parse(localStorage.getItem("xmlToJsonHistory") || "[]");
    const entry = {
      xml: xml.substring(0, 100),
      timestamp: new Date().toISOString(),
      fullXml: xml
    };

    history.unshift(entry);
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("xmlToJsonHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): Array<{ xml: string; timestamp: string; fullXml: string }> {
  try {
    return JSON.parse(localStorage.getItem("xmlToJsonHistory") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("xmlToJsonHistory");
}
