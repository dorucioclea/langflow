import { Node, Edge, Viewport } from "reactflow";
import { FlowType } from "../flow";
//kind and class are just representative names to represent the actual structure of the object received by the API

export type APIObjectType = { kind: APIKindType; [key: string]: APIKindType };
export type APIKindType = { class: APIClassType; [key: string]: APIClassType };
export type APITemplateType = {
	[key: string]: TemplateVariableType;
};
export type APIClassType = {
	base_classes: Array<string>;
	description: string;
	template: APITemplateType;
	flow?: FlowType;
	[key: string]: Array<string> | string | APITemplateType | FlowType;
};
export type TemplateVariableType = {
  type: string;
  required: boolean;
  placeholder?: string;
  list: boolean;
  show: boolean;
  multiline?: boolean;
  value?: any;
  proxy?:string;
  [key: string]: any;
};
export type sendAllProps = {
  nodes: Node[];
  edges: Edge[];
  name: string;
  description: string;
  viewport: Viewport;
  message: string;

  chatHistory: { message: string; isSend: boolean }[];
};
export type errorsTypeAPI = {
  function: { errors: Array<string> };
  imports: { errors: Array<string> };
};
export type PromptTypeAPI = { input_variables: Array<string> };
