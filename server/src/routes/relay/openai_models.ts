import {Model} from "openai/api";

export const openai_models: Model[] = [
  {
    id: "gpt-3.5-turbo",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-3.5-turbo-0301",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-3.5-turbo-0613",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-3.5-turbo-16k",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-3.5-turbo-16k-0613",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4-0314",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4-0613",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4-32k",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4-32k-0314",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "gpt-4-32k-0613",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-embedding-ada-002",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-davinci-003",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-davinci-002",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-curie-001",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-babbage-001",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-ada-001",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-moderation-latest",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-moderation-stable",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "text-davinci-edit-001",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
  {
    id: "code-davinci-edit-001",
    object: "model",
    created: 1677649963,
    owned_by: "openai",
  },
];

export const openai_models_map: Map<string, Model> = openai_models.reduce((map, model) => {
    map.set(model.id, model);
    return map;
  },
  new Map<string, Model>()
);
