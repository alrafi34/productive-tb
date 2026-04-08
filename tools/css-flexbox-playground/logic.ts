export type FlexItem = {
  id: string;
  label: string;
};

export type FlexContainerProps = {
  display: "flex" | "inline-flex";
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  alignItems: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  alignContent: "stretch" | "center" | "space-between" | "space-around" | "flex-start" | "flex-end";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  gap: number;
};

export type FlexItemProps = {
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  order: number;
  alignSelf: "auto" | "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
};

export const DEFAULT_CONTAINER: FlexContainerProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "stretch",
  flexWrap: "nowrap",
  gap: 0,
};

export const DEFAULT_ITEM: FlexItemProps = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: "auto",
  order: 0,
  alignSelf: "auto",
};

type PresetType = {
  container: FlexContainerProps;
  items: FlexItemProps[];
};

export const PRESETS: Record<string, PresetType> = {
  center: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 0,
    },
    items: [DEFAULT_ITEM],
  },
  navbar: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 16,
    },
    items: [DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM],
  },
  spaceBetween: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 0,
    },
    items: [DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM],
  },
  spaceAround: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 0,
    },
    items: [DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM],
  },
  column: {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 12,
    },
    items: [DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM],
  },
  wrap: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "stretch",
      flexWrap: "wrap",
      gap: 12,
    },
    items: [DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM],
  },
  grow: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "stretch",
      flexWrap: "nowrap",
      gap: 12,
    },
    items: [
      { ...DEFAULT_ITEM, flexGrow: 1 },
      { ...DEFAULT_ITEM, flexGrow: 1 },
      { ...DEFAULT_ITEM, flexGrow: 1 },
    ],
  },
};

export function generateContainerCSS(props: FlexContainerProps): string {
  const lines = [
    `display: ${props.display};`,
    `flex-direction: ${props.flexDirection};`,
    `justify-content: ${props.justifyContent};`,
    `align-items: ${props.alignItems};`,
    `align-content: ${props.alignContent};`,
    `flex-wrap: ${props.flexWrap};`,
  ];

  if (props.gap > 0) {
    lines.push(`gap: ${props.gap}px;`);
  }

  return lines.join("\n");
}

export function generateItemCSS(props: FlexItemProps): string {
  const lines = [];

  if (props.flexGrow !== 0) {
    lines.push(`flex-grow: ${props.flexGrow};`);
  }

  if (props.flexShrink !== 1) {
    lines.push(`flex-shrink: ${props.flexShrink};`);
  }

  if (props.flexBasis !== "auto") {
    lines.push(`flex-basis: ${props.flexBasis};`);
  }

  if (props.order !== 0) {
    lines.push(`order: ${props.order};`);
  }

  if (props.alignSelf !== "auto") {
    lines.push(`align-self: ${props.alignSelf};`);
  }

  return lines.length > 0 ? lines.join("\n") : "/* No custom item styles */";
}

export function generateFullCSS(container: FlexContainerProps, items: FlexItemProps[]): string {
  const containerCSS = generateContainerCSS(container);
  const itemCSS = generateItemCSS(items[0] || DEFAULT_ITEM);

  return `.container {
  ${containerCSS}
}

.item {
  ${itemCSS}
}`;
}
