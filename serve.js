var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// serve.ts
__markAsModule(exports);
__export(exports, {
  startServer: () => startServer
});
var import_fs2 = __toModule(require("fs"));
var import_path6 = __toModule(require("path"));
var import_react_torch = __toModule(require("react-torch"));
var import_farrow_http = __toModule(require("farrow-http"));
var import_farrow_react = __toModule(require("farrow-react"));
var import_react_torch2 = __toModule(require("react-torch"));
var import_node_fetch = __toModule(require("node-fetch"));
var import_start = __toModule(require("react-torch/start"));

// api/index.ts
var import_path5 = __toModule(require("path"));

// api/note.ts
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_farrow_api = __toModule(require("farrow-api"));
var import_farrow_schema2 = __toModule(require("farrow-schema"));

// api/schema.ts
var import_farrow_schema = __toModule(require("farrow-schema"));
var Numbers = (0, import_farrow_schema.List)(Number);
var Note = class extends import_farrow_schema.ObjectType {
  constructor() {
    super(...arguments);
    this.id = {
      description: `Note id`,
      [import_farrow_schema.Type]: import_farrow_schema.Int
    };
    this.title = {
      description: `Note title`,
      [import_farrow_schema.Type]: String
    };
    this.name = {
      description: `Note name`,
      [import_farrow_schema.Type]: String
    };
    this.description = {
      description: `Note description`,
      [import_farrow_schema.Type]: String
    };
    this.createTime = {
      description: `Note createTime`,
      [import_farrow_schema.Type]: String
    };
    this.modifiedTime = {
      description: `Note modifiedTime`,
      [import_farrow_schema.Type]: String
    };
    this.tags = {
      description: `Note tags`,
      [import_farrow_schema.Type]: Numbers
    };
    this.tip = {
      description: `Note tip`,
      [import_farrow_schema.Type]: String
    };
  }
};
var Tag = class extends import_farrow_schema.ObjectType {
  constructor() {
    super(...arguments);
    this.id = {
      description: `Tag id`,
      [import_farrow_schema.Type]: import_farrow_schema.Int
    };
    this.title = {
      description: `Tag title`,
      [import_farrow_schema.Type]: String
    };
    this.name = {
      description: `Tag name`,
      [import_farrow_schema.Type]: String
    };
    this.description = {
      description: `Tag description`,
      [import_farrow_schema.Type]: String
    };
  }
};
var Picture = class extends import_farrow_schema.ObjectType {
  constructor() {
    super(...arguments);
    this.id = {
      description: `Picture id`,
      [import_farrow_schema.Type]: import_farrow_schema.Int
    };
    this.name = {
      description: `Picture name`,
      [import_farrow_schema.Type]: String
    };
    this.location = {
      description: `Picture location`,
      [import_farrow_schema.Type]: String
    };
    this.date = {
      description: `Picture date`,
      [import_farrow_schema.Type]: String
    };
    this.url = {
      description: `Picture url`,
      [import_farrow_schema.Type]: String
    };
  }
};
var SystemError = class extends import_farrow_schema.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema.Literal)("SystemError");
    this.message = {
      description: "SystemError message",
      [import_farrow_schema.Type]: String
    };
  }
};

// api/note.ts
var NOTES_PATH = "./data/notes.json";
var NOTE_PATH = "./data/note";
var GetNoteInput = class extends import_farrow_schema2.ObjectType {
  constructor() {
    super(...arguments);
    this.name = {
      description: "Note name",
      [import_farrow_schema2.Type]: String
    };
  }
};
var GetNoteSuccess = class extends import_farrow_schema2.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema2.Literal)("GetNoteSuccess");
    this.note = {
      description: "Note content",
      [import_farrow_schema2.Type]: String
    };
  }
};
var NoteNotExist = class extends import_farrow_schema2.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema2.Literal)("NoteNotExist");
    this.message = {
      description: "NoteNotExist message",
      [import_farrow_schema2.Type]: String
    };
  }
};
var NoteIsBroken = class extends import_farrow_schema2.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema2.Literal)("NoteIsBroken");
    this.message = {
      description: "NoteIsBroken message",
      [import_farrow_schema2.Type]: String
    };
  }
};
var GetNoteOutput = (0, import_farrow_schema2.Union)(GetNoteSuccess, NoteNotExist, NoteIsBroken, SystemError);
var getNote = (0, import_farrow_api.Api)({
  description: "get note content",
  input: GetNoteInput,
  output: GetNoteOutput
});
getNote.use(({name}) => {
  try {
    const notes = require(import_path.default.resolve(process.cwd(), NOTES_PATH));
    const note = notes.find((item) => item.name === name);
    if (note) {
      const filePath = import_path.default.resolve(process.cwd(), NOTE_PATH, `${name}.mdx`);
      if (import_fs.default.existsSync(filePath)) {
        const mdx = import_fs.default.readFileSync(filePath, "utf-8");
        return {
          type: "GetNoteSuccess",
          note: mdx
        };
      } else {
        return {
          type: "NoteIsBroken",
          message: `The note: ${name} is broken`
        };
      }
    } else {
      return {
        type: "NoteNotExist",
        message: `The note: ${name} is not exist`
      };
    }
  } catch (err) {
    return {
      type: "SystemError",
      message: JSON.stringify(err)
    };
  }
});

// api/notes.ts
var import_path2 = __toModule(require("path"));
var import_farrow_api2 = __toModule(require("farrow-api"));
var import_farrow_api_server = __toModule(require("farrow-api-server"));
var import_farrow_schema3 = __toModule(require("farrow-schema"));
var GetNotesInput = {};
var NoteList = (0, import_farrow_schema3.List)(Note);
var GetNotesSuccess = class extends import_farrow_schema3.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema3.Literal)("GetNotesSuccess");
    this.notes = {
      description: "Note list",
      [import_farrow_schema3.Type]: NoteList
    };
  }
};
var GetNotesOutput = (0, import_farrow_schema3.Union)(GetNotesSuccess, SystemError);
var getNotes = (0, import_farrow_api2.Api)({
  description: "get notes",
  input: GetNotesInput,
  output: GetNotesOutput
});
getNotes.use(() => {
  try {
    const notes = require(import_path2.default.resolve(process.cwd(), "./data/notes.json"));
    return {
      type: "GetNotesSuccess",
      notes
    };
  } catch (err) {
    return {
      type: "SystemError",
      message: JSON.stringify(err)
    };
  }
});
var entries = {
  getNotes
};
var notesService = (0, import_farrow_api_server.ApiService)({entries});

// api/tags.ts
var import_path3 = __toModule(require("path"));
var import_farrow_api3 = __toModule(require("farrow-api"));
var import_farrow_api_server2 = __toModule(require("farrow-api-server"));
var import_farrow_schema4 = __toModule(require("farrow-schema"));
var GetTagsInput = {};
var TagList = (0, import_farrow_schema4.List)(Tag);
var GetTagsSuccess = class extends import_farrow_schema4.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema4.Literal)("GetTagsSuccess");
    this.tags = {
      description: "tag list",
      [import_farrow_schema4.Type]: TagList
    };
  }
};
var TagTagsOutput = (0, import_farrow_schema4.Union)(GetTagsSuccess, SystemError);
var getTags = (0, import_farrow_api3.Api)({
  description: "get tags",
  input: GetTagsInput,
  output: TagTagsOutput
});
getTags.use(() => {
  try {
    const tags = require(import_path3.default.resolve(process.cwd(), "./data/tags.json"));
    return {
      type: "GetTagsSuccess",
      tags
    };
  } catch (err) {
    return {
      type: "SystemError",
      message: JSON.stringify(err)
    };
  }
});
var entries2 = {
  getTags
};
var tagsService = (0, import_farrow_api_server2.ApiService)({entries: entries2});

// api/pictures.ts
var import_path4 = __toModule(require("path"));
var import_farrow_api4 = __toModule(require("farrow-api"));
var import_farrow_api_server3 = __toModule(require("farrow-api-server"));
var import_farrow_schema5 = __toModule(require("farrow-schema"));
var GetPicturesInput = {};
var PictureList = (0, import_farrow_schema5.List)(Picture);
var PictureRecord = (0, import_farrow_schema5.Record)((0, import_farrow_schema5.Record)(PictureList));
var GetPicturesSuccess = class extends import_farrow_schema5.ObjectType {
  constructor() {
    super(...arguments);
    this.type = (0, import_farrow_schema5.Literal)("GetPicturesSuccess");
    this.pictures = {
      description: "picture list",
      [import_farrow_schema5.Type]: PictureRecord
    };
  }
};
var PicturePicturesOutput = (0, import_farrow_schema5.Union)(GetPicturesSuccess, SystemError);
var getPictures = (0, import_farrow_api4.Api)({
  description: "get pictures",
  input: GetPicturesInput,
  output: PicturePicturesOutput
});
getPictures.use(() => {
  try {
    const pictures = require(import_path4.default.resolve(process.cwd(), "./data/pictures.json"));
    return {
      type: "GetPicturesSuccess",
      pictures
    };
  } catch (err) {
    return {
      type: "SystemError",
      message: JSON.stringify(err)
    };
  }
});
var entries3 = {
  getPictures
};
var picturesService = (0, import_farrow_api_server3.ApiService)({entries: entries3});

// api/index.ts
var import_farrow_api_server4 = __toModule(require("farrow-api-server"));
var entries4 = {
  getNote,
  getNotes,
  getTags,
  getPictures
};
var api = (0, import_farrow_api_server4.ApiService)({entries: entries4});
api.serve("assets", import_path5.default.resolve(__dirname, "../data"));
var api_default = api;

// serve.ts
process.env.NODE_ENV = "production";
var polyfillNodeFetch = (config) => {
  global.fetch = (input, init) => {
    if (input.startsWith("//")) {
      input = "http:" + input;
    }
    if (input.startsWith("/")) {
      input = `http://localhost:${config.port}${input}`;
    }
    return (0, import_node_fetch.default)(input, init);
  };
};
var torchCofnig = {
  title: "Ma Tianqi",
  src: "./src/page",
  middleware: "./src/middleware",
  document: "./src/document",
  port: 8080,
  installPolyfill: (config) => {
    polyfillNodeFetch(config);
  }
};
var getAssets = (stats) => {
  return Object.keys(stats).reduce((result, assetName) => {
    const value = stats[assetName];
    result[assetName] = Array.isArray(value) ? value[0] : value;
    return result;
  }, {});
};
var startServer = () => {
  return new Promise(async (resolve, reject) => {
    const http = (0, import_farrow_http.Http)();
    http.route("/api").use(api_default);
    const torch = await (0, import_start.default)(torchCofnig);
    http.serve("/", torch.static());
    http.use(async (req) => {
      const ReactView = (0, import_farrow_react.useReactView)({
        docType: "<!doctype html>",
        useStream: true
      });
      const url = req.pathname;
      const codeStr = import_fs2.default.readFileSync(import_path6.default.resolve(torch.config.dir, import_react_torch.TORCH_DIR, import_react_torch.TORCH_CLIENT_DIR, import_react_torch.TORCH_PUBLIC_PATH, import_react_torch.TORCH_ASSETS_FILE_NAME), "utf-8");
      const assets = getAssets(JSON.parse(codeStr));
      const html = await torch.render(url, assets, scripts, styles, {});
      return ReactView.render(html);
    });
    http.listen(torch.config.port, () => {
      resolve(torch.config.port);
    });
  });
};
var styles = [
  {
    type: import_react_torch2.PreloadType.Link,
    href: "/css/base.css",
    preload: true
  }
];
var scripts = [];
startServer().then((port) => {
  console.log(`server started at ${port}`);
}).catch((err) => {
  console.log("error", err);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startServer
});
