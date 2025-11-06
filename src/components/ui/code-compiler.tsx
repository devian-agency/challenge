export interface Color{
  background: string;
  title: string;
  path: string;
  text: string;
  comment: string;

  tagBracket: string;
  tagName: string;
  attribute: string;
  equal: string;
  string: string;
  jsxBrace: string;

  number: string;
  boolean: string;
  keyword: string;
  type: string;
  fn: string;
  operator: string;
}

const colors = {
  background: "#0A0C10",
  title: "#545454",
  path: "#ccc",
  text: "#E5E9F0",
  comment: "#5B6178",

  tagBracket: "#FF6B81",
  tagName: "#9B7CFF",
  attribute: "#7DCEFF",
  equal: "#FF4F6E",
  string: "#A6E57A",
  jsxBrace: "#FF6B9A",

  number: "#FF9668",
  boolean: "#FF9668",
  keyword: "#9B7CFF",
  type: "#7DCEFF",
  fn: "#5CA9FF",
  operator: "#FF6B81",
};

let line = 1;

const pattern =
  /(<\/?([\w-]+))|\/>|>|(([\w-]+)(?==))|(=)|"([^"]*)"|\{([^}]*)\}|(\b\d+(?:\.\d+)?\b)|\b(true|false|null|undefined)\b|\b(const|let|var|return|if|else|for|while|import|from|default|export|extends|interface|type|class|new)\b|(\b[A-Z][a-zA-Z0-9_]*\b)|([a-zA-Z_][a-zA-Z0-9_]*)(?=\()|(=>|\+|-|\*|\/)|\b(function)\b/g;

const codeCompiler = ({text, color = colors}: {text?: string, color?: Color}): {nodes:React.ReactNode[], color: Color} => {
  if (!text) return {nodes:[], color};
  if(!color) color = colors

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  const push = (content: React.ReactNode, col: string) =>
    nodes.push(
      <span key={nodes.length} style={{ color: col }}>
        {content}
      </span>
    );

  text.replace(
    pattern,
    (
      match,
      gTagOpen,
      gTagName,
      _gAttrOuter,
      gAttrName,
      gEqual,
      gStrInner,
      gJsxInner,
      gNumber,
      gBoolean,
      gKeyword,
      gType,
      gFn,
      gOperator,
      fn,
      offset
    ) => {
      if (lastIndex < offset) {
        nodes.push(text.slice(lastIndex, offset));
      }

      if (gTagOpen) {
        push("〈", color.tagBracket);
        nodes.pop();
        push("<", color.tagBracket);
        if (gTagOpen.startsWith("</")) push("/", color.tagBracket);
        if (gTagName) push(gTagName, color.tagName);
      } else if (match === "/>") {
        push("/", color.tagBracket);
        push(">", color.tagBracket);
      } else if (match === ">") {
        push(">", color.tagBracket);
      } else if (gAttrName) {
        push(gAttrName, color.attribute);
      } else if (gEqual) {
        push("=", color.equal);
      } else if (gStrInner !== undefined) {
        push(`"`, color.string);

        push(gStrInner, color.string);
        push(`"`, color.string);
      } else if (gJsxInner !== undefined) {
        push("{", color.jsxBrace);
        nodes.push(...codeCompiler(gJsxInner).nodes);
        push("}", color.jsxBrace);

      } else if (gNumber) {
        push(gNumber, color.number);
      } else if (gBoolean) {
        push(gBoolean, color.boolean);
      } else if (gKeyword) {
        push(gKeyword, color.keyword);
      } else if (gType) {
        push(gType, color.type);
      } else if (gFn) {
        push(gFn, color.fn);
      } else if (gOperator) {
        push(gOperator, color.operator);
      } else if(fn) {
        push(fn, color.operator);
      }
      else {
        push(match, color.text);
      }

      lastIndex = offset + match.length;
      return match;
    }
  );

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return {nodes, color};
};

export default codeCompiler;
