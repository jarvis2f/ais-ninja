// source: generation.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
goog.object.extend(proto, google_protobuf_struct_pb);
var tensors_pb = require('./tensors_pb.js');
goog.object.extend(proto, tensors_pb);
goog.exportSymbol('proto.gooseai.Action', null, global);
goog.exportSymbol('proto.gooseai.Answer', null, global);
goog.exportSymbol('proto.gooseai.AnswerBatch', null, global);
goog.exportSymbol('proto.gooseai.AnswerMeta', null, global);
goog.exportSymbol('proto.gooseai.Artifact', null, global);
goog.exportSymbol('proto.gooseai.Artifact.DataCase', null, global);
goog.exportSymbol('proto.gooseai.ArtifactType', null, global);
goog.exportSymbol('proto.gooseai.AssetAction', null, global);
goog.exportSymbol('proto.gooseai.AssetParameters', null, global);
goog.exportSymbol('proto.gooseai.AssetUse', null, global);
goog.exportSymbol('proto.gooseai.BorderMode', null, global);
goog.exportSymbol('proto.gooseai.CAIParameters', null, global);
goog.exportSymbol('proto.gooseai.CAIParameters.ModelMetadata', null, global);
goog.exportSymbol('proto.gooseai.CAIParameters.ParametersCase', null, global);
goog.exportSymbol('proto.gooseai.CameraParameters', null, global);
goog.exportSymbol('proto.gooseai.CameraType', null, global);
goog.exportSymbol('proto.gooseai.ChainRequest', null, global);
goog.exportSymbol('proto.gooseai.ClassifierCategory', null, global);
goog.exportSymbol('proto.gooseai.ClassifierConcept', null, global);
goog.exportSymbol('proto.gooseai.ClassifierMode', null, global);
goog.exportSymbol('proto.gooseai.ClassifierParameters', null, global);
goog.exportSymbol('proto.gooseai.ColorMatchMode', null, global);
goog.exportSymbol('proto.gooseai.ConditionerParameters', null, global);
goog.exportSymbol('proto.gooseai.CutoutParameters', null, global);
goog.exportSymbol('proto.gooseai.DiffusionSampler', null, global);
goog.exportSymbol('proto.gooseai.FineTuningParameters', null, global);
goog.exportSymbol('proto.gooseai.FinishReason', null, global);
goog.exportSymbol('proto.gooseai.GuidanceInstanceParameters', null, global);
goog.exportSymbol('proto.gooseai.GuidanceParameters', null, global);
goog.exportSymbol('proto.gooseai.GuidancePreset', null, global);
goog.exportSymbol('proto.gooseai.GuidanceScheduleParameters', null, global);
goog.exportSymbol('proto.gooseai.ImageParameters', null, global);
goog.exportSymbol('proto.gooseai.InterpolateMode', null, global);
goog.exportSymbol('proto.gooseai.InterpolateParameters', null, global);
goog.exportSymbol('proto.gooseai.MaskedAreaInit', null, global);
goog.exportSymbol('proto.gooseai.Model', null, global);
goog.exportSymbol('proto.gooseai.ModelArchitecture', null, global);
goog.exportSymbol('proto.gooseai.OnStatus', null, global);
goog.exportSymbol('proto.gooseai.Prompt', null, global);
goog.exportSymbol('proto.gooseai.Prompt.PromptCase', null, global);
goog.exportSymbol('proto.gooseai.PromptParameters', null, global);
goog.exportSymbol('proto.gooseai.RenderMode', null, global);
goog.exportSymbol('proto.gooseai.Request', null, global);
goog.exportSymbol('proto.gooseai.Request.ParamsCase', null, global);
goog.exportSymbol('proto.gooseai.SamplerParameters', null, global);
goog.exportSymbol('proto.gooseai.ScheduleParameters', null, global);
goog.exportSymbol('proto.gooseai.Stage', null, global);
goog.exportSymbol('proto.gooseai.StageAction', null, global);
goog.exportSymbol('proto.gooseai.StepParameter', null, global);
goog.exportSymbol('proto.gooseai.T2IAdapter', null, global);
goog.exportSymbol('proto.gooseai.T2IAdapterInit', null, global);
goog.exportSymbol('proto.gooseai.T2IAdapterParameter', null, global);
goog.exportSymbol('proto.gooseai.Token', null, global);
goog.exportSymbol('proto.gooseai.Tokens', null, global);
goog.exportSymbol('proto.gooseai.TransformCameraPose', null, global);
goog.exportSymbol('proto.gooseai.TransformColorAdjust', null, global);
goog.exportSymbol('proto.gooseai.TransformDepthCalc', null, global);
goog.exportSymbol('proto.gooseai.TransformMatrix', null, global);
goog.exportSymbol('proto.gooseai.TransformParameters', null, global);
goog.exportSymbol('proto.gooseai.TransformParameters.TransformCase', null, global);
goog.exportSymbol('proto.gooseai.TransformResample', null, global);
goog.exportSymbol('proto.gooseai.TransformType', null, global);
goog.exportSymbol('proto.gooseai.TransformType.TypeCase', null, global);
goog.exportSymbol('proto.gooseai.Upscaler', null, global);
goog.exportSymbol('proto.gooseai.WeightMethod', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Token = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.Token, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Token.displayName = 'proto.gooseai.Token';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Tokens = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.Tokens.repeatedFields_, null);
};
goog.inherits(proto.gooseai.Tokens, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Tokens.displayName = 'proto.gooseai.Tokens';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Artifact = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gooseai.Artifact.oneofGroups_);
};
goog.inherits(proto.gooseai.Artifact, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Artifact.displayName = 'proto.gooseai.Artifact';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.PromptParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.PromptParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.PromptParameters.displayName = 'proto.gooseai.PromptParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Prompt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gooseai.Prompt.oneofGroups_);
};
goog.inherits(proto.gooseai.Prompt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Prompt.displayName = 'proto.gooseai.Prompt';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.SamplerParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.SamplerParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.SamplerParameters.displayName = 'proto.gooseai.SamplerParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ConditionerParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.ConditionerParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ConditionerParameters.displayName = 'proto.gooseai.ConditionerParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ScheduleParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.ScheduleParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ScheduleParameters.displayName = 'proto.gooseai.ScheduleParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.StepParameter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.StepParameter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.StepParameter.displayName = 'proto.gooseai.StepParameter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Model = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.Model, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Model.displayName = 'proto.gooseai.Model';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.CutoutParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.CutoutParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.CutoutParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.CutoutParameters.displayName = 'proto.gooseai.CutoutParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.GuidanceScheduleParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.GuidanceScheduleParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.GuidanceScheduleParameters.displayName = 'proto.gooseai.GuidanceScheduleParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.GuidanceInstanceParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.GuidanceInstanceParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.GuidanceInstanceParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.GuidanceInstanceParameters.displayName = 'proto.gooseai.GuidanceInstanceParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.GuidanceParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.GuidanceParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.GuidanceParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.GuidanceParameters.displayName = 'proto.gooseai.GuidanceParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gooseai.TransformType.oneofGroups_);
};
goog.inherits(proto.gooseai.TransformType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformType.displayName = 'proto.gooseai.TransformType';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.T2IAdapterParameter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.T2IAdapterParameter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.T2IAdapterParameter.displayName = 'proto.gooseai.T2IAdapterParameter';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.CAIParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gooseai.CAIParameters.oneofGroups_);
};
goog.inherits(proto.gooseai.CAIParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.CAIParameters.displayName = 'proto.gooseai.CAIParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.FineTuningParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.FineTuningParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.FineTuningParameters.displayName = 'proto.gooseai.FineTuningParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ImageParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.ImageParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.ImageParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ImageParameters.displayName = 'proto.gooseai.ImageParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ClassifierConcept = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.ClassifierConcept, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ClassifierConcept.displayName = 'proto.gooseai.ClassifierConcept';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ClassifierCategory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.ClassifierCategory.repeatedFields_, null);
};
goog.inherits(proto.gooseai.ClassifierCategory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ClassifierCategory.displayName = 'proto.gooseai.ClassifierCategory';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ClassifierParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.ClassifierParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.ClassifierParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ClassifierParameters.displayName = 'proto.gooseai.ClassifierParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.InterpolateParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.InterpolateParameters.repeatedFields_, null);
};
goog.inherits(proto.gooseai.InterpolateParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.InterpolateParameters.displayName = 'proto.gooseai.InterpolateParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformColorAdjust = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.TransformColorAdjust, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformColorAdjust.displayName = 'proto.gooseai.TransformColorAdjust';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformDepthCalc = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.TransformDepthCalc, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformDepthCalc.displayName = 'proto.gooseai.TransformDepthCalc';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformMatrix = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.TransformMatrix.repeatedFields_, null);
};
goog.inherits(proto.gooseai.TransformMatrix, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformMatrix.displayName = 'proto.gooseai.TransformMatrix';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformResample = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.TransformResample, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformResample.displayName = 'proto.gooseai.TransformResample';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.CameraParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.CameraParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.CameraParameters.displayName = 'proto.gooseai.CameraParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformCameraPose = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.TransformCameraPose, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformCameraPose.displayName = 'proto.gooseai.TransformCameraPose';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.TransformParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gooseai.TransformParameters.oneofGroups_);
};
goog.inherits(proto.gooseai.TransformParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.TransformParameters.displayName = 'proto.gooseai.TransformParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.AssetParameters = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.AssetParameters, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.AssetParameters.displayName = 'proto.gooseai.AssetParameters';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.AnswerMeta = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gooseai.AnswerMeta, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.AnswerMeta.displayName = 'proto.gooseai.AnswerMeta';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Answer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.Answer.repeatedFields_, null);
};
goog.inherits(proto.gooseai.Answer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Answer.displayName = 'proto.gooseai.Answer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.AnswerBatch = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.AnswerBatch.repeatedFields_, null);
};
goog.inherits(proto.gooseai.AnswerBatch, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.AnswerBatch.displayName = 'proto.gooseai.AnswerBatch';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Request = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.gooseai.Request.repeatedFields_, proto.gooseai.Request.oneofGroups_);
};
goog.inherits(proto.gooseai.Request, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Request.displayName = 'proto.gooseai.Request';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.OnStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.OnStatus.repeatedFields_, null);
};
goog.inherits(proto.gooseai.OnStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.OnStatus.displayName = 'proto.gooseai.OnStatus';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.Stage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.Stage.repeatedFields_, null);
};
goog.inherits(proto.gooseai.Stage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.Stage.displayName = 'proto.gooseai.Stage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gooseai.ChainRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gooseai.ChainRequest.repeatedFields_, null);
};
goog.inherits(proto.gooseai.ChainRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gooseai.ChainRequest.displayName = 'proto.gooseai.ChainRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Token.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Token.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Token} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Token.toObject = function(includeInstance, msg) {
    var f, obj = {
      text: jspb.Message.getFieldWithDefault(msg, 1, ""),
      id: jspb.Message.getFieldWithDefault(msg, 2, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Token}
 */
proto.gooseai.Token.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Token;
  return proto.gooseai.Token.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Token} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Token}
 */
proto.gooseai.Token.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setText(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setId(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Token.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Token.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Token} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Token.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getId();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional string text = 1;
 * @return {string}
 */
proto.gooseai.Token.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Token} returns this
 */
proto.gooseai.Token.prototype.setText = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Token} returns this
 */
proto.gooseai.Token.prototype.clearText = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Token.prototype.hasText = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint32 id = 2;
 * @return {number}
 */
proto.gooseai.Token.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Token} returns this
 */
proto.gooseai.Token.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.Tokens.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Tokens.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Tokens.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Tokens} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Tokens.toObject = function(includeInstance, msg) {
    var f, obj = {
      tokensList: jspb.Message.toObjectList(msg.getTokensList(),
        proto.gooseai.Token.toObject, includeInstance),
      tokenizerId: jspb.Message.getFieldWithDefault(msg, 2, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Tokens}
 */
proto.gooseai.Tokens.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Tokens;
  return proto.gooseai.Tokens.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Tokens} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Tokens}
 */
proto.gooseai.Tokens.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.gooseai.Token;
        reader.readMessage(value,proto.gooseai.Token.deserializeBinaryFromReader);
        msg.addTokens(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setTokenizerId(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Tokens.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Tokens.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Tokens} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Tokens.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTokensList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gooseai.Token.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Token tokens = 1;
 * @return {!Array<!proto.gooseai.Token>}
 */
proto.gooseai.Tokens.prototype.getTokensList = function() {
  return /** @type{!Array<!proto.gooseai.Token>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Token, 1));
};


/**
 * @param {!Array<!proto.gooseai.Token>} value
 * @return {!proto.gooseai.Tokens} returns this
 */
proto.gooseai.Tokens.prototype.setTokensList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gooseai.Token=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Token}
 */
proto.gooseai.Tokens.prototype.addTokens = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gooseai.Token, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.Tokens} returns this
 */
proto.gooseai.Tokens.prototype.clearTokensList = function() {
  return this.setTokensList([]);
};


/**
 * optional string tokenizer_id = 2;
 * @return {string}
 */
proto.gooseai.Tokens.prototype.getTokenizerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Tokens} returns this
 */
proto.gooseai.Tokens.prototype.setTokenizerId = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Tokens} returns this
 */
proto.gooseai.Tokens.prototype.clearTokenizerId = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Tokens.prototype.hasTokenizerId = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.Artifact.oneofGroups_ = [[5,6,7,11,14]];

/**
 * @enum {number}
 */
proto.gooseai.Artifact.DataCase = {
  DATA_NOT_SET: 0,
  BINARY: 5,
  TEXT: 6,
  TOKENS: 7,
  CLASSIFIER: 11,
  TENSOR: 14
};

/**
 * @return {proto.gooseai.Artifact.DataCase}
 */
proto.gooseai.Artifact.prototype.getDataCase = function() {
  return /** @type {proto.gooseai.Artifact.DataCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.Artifact.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Artifact.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Artifact.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Artifact} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Artifact.toObject = function(includeInstance, msg) {
    var f, obj = {
      id: jspb.Message.getFieldWithDefault(msg, 1, 0),
      type: jspb.Message.getFieldWithDefault(msg, 2, 0),
      mime: jspb.Message.getFieldWithDefault(msg, 3, ""),
      magic: jspb.Message.getFieldWithDefault(msg, 4, ""),
      binary: msg.getBinary_asB64(),
      text: jspb.Message.getFieldWithDefault(msg, 6, ""),
      tokens: (f = msg.getTokens()) && proto.gooseai.Tokens.toObject(includeInstance, f),
      classifier: (f = msg.getClassifier()) && proto.gooseai.ClassifierParameters.toObject(includeInstance, f),
      tensor: (f = msg.getTensor()) && tensors_pb.Tensor.toObject(includeInstance, f),
      index: jspb.Message.getFieldWithDefault(msg, 8, 0),
      finishReason: jspb.Message.getFieldWithDefault(msg, 9, 0),
      seed: jspb.Message.getFieldWithDefault(msg, 10, 0),
      uuid: jspb.Message.getFieldWithDefault(msg, 12, ""),
      size: jspb.Message.getFieldWithDefault(msg, 13, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Artifact}
 */
proto.gooseai.Artifact.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Artifact;
  return proto.gooseai.Artifact.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Artifact} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Artifact}
 */
proto.gooseai.Artifact.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setId(value);
        break;
      case 2:
        var value = /** @type {!proto.gooseai.ArtifactType} */ (reader.readEnum());
        msg.setType(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setMime(value);
        break;
      case 4:
        var value = /** @type {string} */ (reader.readString());
        msg.setMagic(value);
        break;
      case 5:
        var value = /** @type {!Uint8Array} */ (reader.readBytes());
        msg.setBinary(value);
        break;
      case 6:
        var value = /** @type {string} */ (reader.readString());
        msg.setText(value);
        break;
      case 7:
        var value = new proto.gooseai.Tokens;
        reader.readMessage(value,proto.gooseai.Tokens.deserializeBinaryFromReader);
        msg.setTokens(value);
        break;
      case 11:
        var value = new proto.gooseai.ClassifierParameters;
        reader.readMessage(value,proto.gooseai.ClassifierParameters.deserializeBinaryFromReader);
        msg.setClassifier(value);
        break;
      case 14:
        var value = new tensors_pb.Tensor;
        reader.readMessage(value,tensors_pb.Tensor.deserializeBinaryFromReader);
        msg.setTensor(value);
        break;
      case 8:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setIndex(value);
        break;
      case 9:
        var value = /** @type {!proto.gooseai.FinishReason} */ (reader.readEnum());
        msg.setFinishReason(value);
        break;
      case 10:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setSeed(value);
        break;
      case 12:
        var value = /** @type {string} */ (reader.readString());
        msg.setUuid(value);
        break;
      case 13:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setSize(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Artifact.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Artifact.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Artifact} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Artifact.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getMime();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeBytes(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getTokens();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gooseai.Tokens.serializeBinaryToWriter
    );
  }
  f = message.getClassifier();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.gooseai.ClassifierParameters.serializeBinaryToWriter
    );
  }
  f = message.getTensor();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      tensors_pb.Tensor.serializeBinaryToWriter
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getFinishReason();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = message.getSeed();
  if (f !== 0) {
    writer.writeUint32(
      10,
      f
    );
  }
  f = message.getUuid();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeUint64(
      13,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.gooseai.Artifact.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional ArtifactType type = 2;
 * @return {!proto.gooseai.ArtifactType}
 */
proto.gooseai.Artifact.prototype.getType = function() {
  return /** @type {!proto.gooseai.ArtifactType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gooseai.ArtifactType} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string mime = 3;
 * @return {string}
 */
proto.gooseai.Artifact.prototype.getMime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setMime = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string magic = 4;
 * @return {string}
 */
proto.gooseai.Artifact.prototype.getMagic = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setMagic = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearMagic = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasMagic = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional bytes binary = 5;
 * @return {!(string|Uint8Array)}
 */
proto.gooseai.Artifact.prototype.getBinary = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes binary = 5;
 * This is a type-conversion wrapper around `getBinary()`
 * @return {string}
 */
proto.gooseai.Artifact.prototype.getBinary_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
    this.getBinary()));
};


/**
 * optional bytes binary = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBinary()`
 * @return {!Uint8Array}
 */
proto.gooseai.Artifact.prototype.getBinary_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
    this.getBinary()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setBinary = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.gooseai.Artifact.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearBinary = function() {
  return jspb.Message.setOneofField(this, 5, proto.gooseai.Artifact.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasBinary = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string text = 6;
 * @return {string}
 */
proto.gooseai.Artifact.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setText = function(value) {
  return jspb.Message.setOneofField(this, 6, proto.gooseai.Artifact.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearText = function() {
  return jspb.Message.setOneofField(this, 6, proto.gooseai.Artifact.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasText = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional Tokens tokens = 7;
 * @return {?proto.gooseai.Tokens}
 */
proto.gooseai.Artifact.prototype.getTokens = function() {
  return /** @type{?proto.gooseai.Tokens} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Tokens, 7));
};


/**
 * @param {?proto.gooseai.Tokens|undefined} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setTokens = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.gooseai.Artifact.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearTokens = function() {
  return this.setTokens(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasTokens = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional ClassifierParameters classifier = 11;
 * @return {?proto.gooseai.ClassifierParameters}
 */
proto.gooseai.Artifact.prototype.getClassifier = function() {
  return /** @type{?proto.gooseai.ClassifierParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.ClassifierParameters, 11));
};


/**
 * @param {?proto.gooseai.ClassifierParameters|undefined} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setClassifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.gooseai.Artifact.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearClassifier = function() {
  return this.setClassifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasClassifier = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional tensors.Tensor tensor = 14;
 * @return {?proto.tensors.Tensor}
 */
proto.gooseai.Artifact.prototype.getTensor = function() {
  return /** @type{?proto.tensors.Tensor} */ (
    jspb.Message.getWrapperField(this, tensors_pb.Tensor, 14));
};


/**
 * @param {?proto.tensors.Tensor|undefined} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setTensor = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.gooseai.Artifact.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.clearTensor = function() {
  return this.setTensor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Artifact.prototype.hasTensor = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional uint32 index = 8;
 * @return {number}
 */
proto.gooseai.Artifact.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional FinishReason finish_reason = 9;
 * @return {!proto.gooseai.FinishReason}
 */
proto.gooseai.Artifact.prototype.getFinishReason = function() {
  return /** @type {!proto.gooseai.FinishReason} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.gooseai.FinishReason} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setFinishReason = function(value) {
  return jspb.Message.setProto3EnumField(this, 9, value);
};


/**
 * optional uint32 seed = 10;
 * @return {number}
 */
proto.gooseai.Artifact.prototype.getSeed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setSeed = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional string uuid = 12;
 * @return {string}
 */
proto.gooseai.Artifact.prototype.getUuid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setUuid = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional uint64 size = 13;
 * @return {number}
 */
proto.gooseai.Artifact.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Artifact} returns this
 */
proto.gooseai.Artifact.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.PromptParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.PromptParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.PromptParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.PromptParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      init: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
      weight: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.PromptParameters}
 */
proto.gooseai.PromptParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.PromptParameters;
  return proto.gooseai.PromptParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.PromptParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.PromptParameters}
 */
proto.gooseai.PromptParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setInit(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setWeight(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.PromptParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.PromptParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.PromptParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.PromptParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional bool init = 1;
 * @return {boolean}
 */
proto.gooseai.PromptParameters.prototype.getInit = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gooseai.PromptParameters} returns this
 */
proto.gooseai.PromptParameters.prototype.setInit = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.PromptParameters} returns this
 */
proto.gooseai.PromptParameters.prototype.clearInit = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.PromptParameters.prototype.hasInit = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float weight = 2;
 * @return {number}
 */
proto.gooseai.PromptParameters.prototype.getWeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.PromptParameters} returns this
 */
proto.gooseai.PromptParameters.prototype.setWeight = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.PromptParameters} returns this
 */
proto.gooseai.PromptParameters.prototype.clearWeight = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.PromptParameters.prototype.hasWeight = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.Prompt.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.gooseai.Prompt.PromptCase = {
  PROMPT_NOT_SET: 0,
  TEXT: 2,
  TOKENS: 3,
  ARTIFACT: 4
};

/**
 * @return {proto.gooseai.Prompt.PromptCase}
 */
proto.gooseai.Prompt.prototype.getPromptCase = function() {
  return /** @type {proto.gooseai.Prompt.PromptCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.Prompt.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Prompt.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Prompt.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Prompt} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Prompt.toObject = function(includeInstance, msg) {
    var f, obj = {
      parameters: (f = msg.getParameters()) && proto.gooseai.PromptParameters.toObject(includeInstance, f),
      text: jspb.Message.getFieldWithDefault(msg, 2, ""),
      tokens: (f = msg.getTokens()) && proto.gooseai.Tokens.toObject(includeInstance, f),
      artifact: (f = msg.getArtifact()) && proto.gooseai.Artifact.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Prompt}
 */
proto.gooseai.Prompt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Prompt;
  return proto.gooseai.Prompt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Prompt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Prompt}
 */
proto.gooseai.Prompt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.gooseai.PromptParameters;
        reader.readMessage(value,proto.gooseai.PromptParameters.deserializeBinaryFromReader);
        msg.setParameters(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setText(value);
        break;
      case 3:
        var value = new proto.gooseai.Tokens;
        reader.readMessage(value,proto.gooseai.Tokens.deserializeBinaryFromReader);
        msg.setTokens(value);
        break;
      case 4:
        var value = new proto.gooseai.Artifact;
        reader.readMessage(value,proto.gooseai.Artifact.deserializeBinaryFromReader);
        msg.setArtifact(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Prompt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Prompt.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Prompt} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Prompt.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getParameters();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gooseai.PromptParameters.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTokens();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gooseai.Tokens.serializeBinaryToWriter
    );
  }
  f = message.getArtifact();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gooseai.Artifact.serializeBinaryToWriter
    );
  }
};


/**
 * optional PromptParameters parameters = 1;
 * @return {?proto.gooseai.PromptParameters}
 */
proto.gooseai.Prompt.prototype.getParameters = function() {
  return /** @type{?proto.gooseai.PromptParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.PromptParameters, 1));
};


/**
 * @param {?proto.gooseai.PromptParameters|undefined} value
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.setParameters = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.clearParameters = function() {
  return this.setParameters(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Prompt.prototype.hasParameters = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string text = 2;
 * @return {string}
 */
proto.gooseai.Prompt.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.setText = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.gooseai.Prompt.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.clearText = function() {
  return jspb.Message.setOneofField(this, 2, proto.gooseai.Prompt.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Prompt.prototype.hasText = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Tokens tokens = 3;
 * @return {?proto.gooseai.Tokens}
 */
proto.gooseai.Prompt.prototype.getTokens = function() {
  return /** @type{?proto.gooseai.Tokens} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Tokens, 3));
};


/**
 * @param {?proto.gooseai.Tokens|undefined} value
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.setTokens = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.gooseai.Prompt.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.clearTokens = function() {
  return this.setTokens(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Prompt.prototype.hasTokens = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Artifact artifact = 4;
 * @return {?proto.gooseai.Artifact}
 */
proto.gooseai.Prompt.prototype.getArtifact = function() {
  return /** @type{?proto.gooseai.Artifact} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Artifact, 4));
};


/**
 * @param {?proto.gooseai.Artifact|undefined} value
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.setArtifact = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.gooseai.Prompt.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Prompt} returns this
 */
proto.gooseai.Prompt.prototype.clearArtifact = function() {
  return this.setArtifact(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Prompt.prototype.hasArtifact = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.SamplerParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.SamplerParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.SamplerParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.SamplerParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      eta: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      samplingSteps: jspb.Message.getFieldWithDefault(msg, 2, 0),
      latentChannels: jspb.Message.getFieldWithDefault(msg, 3, 0),
      downsamplingFactor: jspb.Message.getFieldWithDefault(msg, 4, 0),
      cfgScale: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
      initNoiseScale: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
      stepNoiseScale: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.SamplerParameters}
 */
proto.gooseai.SamplerParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.SamplerParameters;
  return proto.gooseai.SamplerParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.SamplerParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.SamplerParameters}
 */
proto.gooseai.SamplerParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setEta(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setSamplingSteps(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setLatentChannels(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setDownsamplingFactor(value);
        break;
      case 5:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setCfgScale(value);
        break;
      case 6:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setInitNoiseScale(value);
        break;
      case 7:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setStepNoiseScale(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.SamplerParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.SamplerParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.SamplerParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.SamplerParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeFloat(
      7,
      f
    );
  }
};


/**
 * optional float eta = 1;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getEta = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setEta = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearEta = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasEta = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 sampling_steps = 2;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getSamplingSteps = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setSamplingSteps = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearSamplingSteps = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasSamplingSteps = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 latent_channels = 3;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getLatentChannels = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setLatentChannels = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearLatentChannels = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasLatentChannels = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional uint64 downsampling_factor = 4;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getDownsamplingFactor = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setDownsamplingFactor = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearDownsamplingFactor = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasDownsamplingFactor = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional float cfg_scale = 5;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getCfgScale = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setCfgScale = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearCfgScale = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasCfgScale = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional float init_noise_scale = 6;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getInitNoiseScale = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setInitNoiseScale = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearInitNoiseScale = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasInitNoiseScale = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional float step_noise_scale = 7;
 * @return {number}
 */
proto.gooseai.SamplerParameters.prototype.getStepNoiseScale = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.setStepNoiseScale = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.SamplerParameters} returns this
 */
proto.gooseai.SamplerParameters.prototype.clearStepNoiseScale = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.SamplerParameters.prototype.hasStepNoiseScale = function() {
  return jspb.Message.getField(this, 7) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ConditionerParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ConditionerParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ConditionerParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ConditionerParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      vectorAdjustPrior: jspb.Message.getFieldWithDefault(msg, 1, ""),
      conditioner: (f = msg.getConditioner()) && proto.gooseai.Model.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ConditionerParameters}
 */
proto.gooseai.ConditionerParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ConditionerParameters;
  return proto.gooseai.ConditionerParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ConditionerParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ConditionerParameters}
 */
proto.gooseai.ConditionerParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setVectorAdjustPrior(value);
        break;
      case 2:
        var value = new proto.gooseai.Model;
        reader.readMessage(value,proto.gooseai.Model.deserializeBinaryFromReader);
        msg.setConditioner(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ConditionerParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ConditionerParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ConditionerParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ConditionerParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConditioner();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.Model.serializeBinaryToWriter
    );
  }
};


/**
 * optional string vector_adjust_prior = 1;
 * @return {string}
 */
proto.gooseai.ConditionerParameters.prototype.getVectorAdjustPrior = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.ConditionerParameters} returns this
 */
proto.gooseai.ConditionerParameters.prototype.setVectorAdjustPrior = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ConditionerParameters} returns this
 */
proto.gooseai.ConditionerParameters.prototype.clearVectorAdjustPrior = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ConditionerParameters.prototype.hasVectorAdjustPrior = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Model conditioner = 2;
 * @return {?proto.gooseai.Model}
 */
proto.gooseai.ConditionerParameters.prototype.getConditioner = function() {
  return /** @type{?proto.gooseai.Model} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Model, 2));
};


/**
 * @param {?proto.gooseai.Model|undefined} value
 * @return {!proto.gooseai.ConditionerParameters} returns this
 */
proto.gooseai.ConditionerParameters.prototype.setConditioner = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.ConditionerParameters} returns this
 */
proto.gooseai.ConditionerParameters.prototype.clearConditioner = function() {
  return this.setConditioner(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ConditionerParameters.prototype.hasConditioner = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ScheduleParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ScheduleParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ScheduleParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ScheduleParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      start: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      end: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
      value: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ScheduleParameters}
 */
proto.gooseai.ScheduleParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ScheduleParameters;
  return proto.gooseai.ScheduleParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ScheduleParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ScheduleParameters}
 */
proto.gooseai.ScheduleParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setStart(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setEnd(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setValue(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ScheduleParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ScheduleParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ScheduleParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ScheduleParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
};


/**
 * optional float start = 1;
 * @return {number}
 */
proto.gooseai.ScheduleParameters.prototype.getStart = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.setStart = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.clearStart = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ScheduleParameters.prototype.hasStart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float end = 2;
 * @return {number}
 */
proto.gooseai.ScheduleParameters.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.setEnd = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.clearEnd = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ScheduleParameters.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float value = 3;
 * @return {number}
 */
proto.gooseai.ScheduleParameters.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.setValue = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ScheduleParameters} returns this
 */
proto.gooseai.ScheduleParameters.prototype.clearValue = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ScheduleParameters.prototype.hasValue = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.StepParameter.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.StepParameter.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.StepParameter} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.StepParameter.toObject = function(includeInstance, msg) {
    var f, obj = {
      scaledStep: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      sampler: (f = msg.getSampler()) && proto.gooseai.SamplerParameters.toObject(includeInstance, f),
      schedule: (f = msg.getSchedule()) && proto.gooseai.ScheduleParameters.toObject(includeInstance, f),
      guidance: (f = msg.getGuidance()) && proto.gooseai.GuidanceParameters.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.StepParameter}
 */
proto.gooseai.StepParameter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.StepParameter;
  return proto.gooseai.StepParameter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.StepParameter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.StepParameter}
 */
proto.gooseai.StepParameter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setScaledStep(value);
        break;
      case 2:
        var value = new proto.gooseai.SamplerParameters;
        reader.readMessage(value,proto.gooseai.SamplerParameters.deserializeBinaryFromReader);
        msg.setSampler(value);
        break;
      case 3:
        var value = new proto.gooseai.ScheduleParameters;
        reader.readMessage(value,proto.gooseai.ScheduleParameters.deserializeBinaryFromReader);
        msg.setSchedule(value);
        break;
      case 4:
        var value = new proto.gooseai.GuidanceParameters;
        reader.readMessage(value,proto.gooseai.GuidanceParameters.deserializeBinaryFromReader);
        msg.setGuidance(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.StepParameter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.StepParameter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.StepParameter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.StepParameter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getScaledStep();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getSampler();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.SamplerParameters.serializeBinaryToWriter
    );
  }
  f = message.getSchedule();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gooseai.ScheduleParameters.serializeBinaryToWriter
    );
  }
  f = message.getGuidance();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gooseai.GuidanceParameters.serializeBinaryToWriter
    );
  }
};


/**
 * optional float scaled_step = 1;
 * @return {number}
 */
proto.gooseai.StepParameter.prototype.getScaledStep = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.setScaledStep = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional SamplerParameters sampler = 2;
 * @return {?proto.gooseai.SamplerParameters}
 */
proto.gooseai.StepParameter.prototype.getSampler = function() {
  return /** @type{?proto.gooseai.SamplerParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.SamplerParameters, 2));
};


/**
 * @param {?proto.gooseai.SamplerParameters|undefined} value
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.setSampler = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.clearSampler = function() {
  return this.setSampler(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.StepParameter.prototype.hasSampler = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ScheduleParameters schedule = 3;
 * @return {?proto.gooseai.ScheduleParameters}
 */
proto.gooseai.StepParameter.prototype.getSchedule = function() {
  return /** @type{?proto.gooseai.ScheduleParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.ScheduleParameters, 3));
};


/**
 * @param {?proto.gooseai.ScheduleParameters|undefined} value
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.setSchedule = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.clearSchedule = function() {
  return this.setSchedule(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.StepParameter.prototype.hasSchedule = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional GuidanceParameters guidance = 4;
 * @return {?proto.gooseai.GuidanceParameters}
 */
proto.gooseai.StepParameter.prototype.getGuidance = function() {
  return /** @type{?proto.gooseai.GuidanceParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.GuidanceParameters, 4));
};


/**
 * @param {?proto.gooseai.GuidanceParameters|undefined} value
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.setGuidance = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.StepParameter} returns this
 */
proto.gooseai.StepParameter.prototype.clearGuidance = function() {
  return this.setGuidance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.StepParameter.prototype.hasGuidance = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Model.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Model.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Model} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Model.toObject = function(includeInstance, msg) {
    var f, obj = {
      architecture: jspb.Message.getFieldWithDefault(msg, 1, 0),
      publisher: jspb.Message.getFieldWithDefault(msg, 2, ""),
      dataset: jspb.Message.getFieldWithDefault(msg, 3, ""),
      version: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
      semanticVersion: jspb.Message.getFieldWithDefault(msg, 5, ""),
      alias: jspb.Message.getFieldWithDefault(msg, 6, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Model}
 */
proto.gooseai.Model.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Model;
  return proto.gooseai.Model.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Model} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Model}
 */
proto.gooseai.Model.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.ModelArchitecture} */ (reader.readEnum());
        msg.setArchitecture(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setPublisher(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setDataset(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setVersion(value);
        break;
      case 5:
        var value = /** @type {string} */ (reader.readString());
        msg.setSemanticVersion(value);
        break;
      case 6:
        var value = /** @type {string} */ (reader.readString());
        msg.setAlias(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Model.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Model.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Model} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Model.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getArchitecture();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getPublisher();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDataset();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getSemanticVersion();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAlias();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional ModelArchitecture architecture = 1;
 * @return {!proto.gooseai.ModelArchitecture}
 */
proto.gooseai.Model.prototype.getArchitecture = function() {
  return /** @type {!proto.gooseai.ModelArchitecture} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.ModelArchitecture} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setArchitecture = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string publisher = 2;
 * @return {string}
 */
proto.gooseai.Model.prototype.getPublisher = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setPublisher = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string dataset = 3;
 * @return {string}
 */
proto.gooseai.Model.prototype.getDataset = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setDataset = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float version = 4;
 * @return {number}
 */
proto.gooseai.Model.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setVersion = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional string semantic_version = 5;
 * @return {string}
 */
proto.gooseai.Model.prototype.getSemanticVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setSemanticVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string alias = 6;
 * @return {string}
 */
proto.gooseai.Model.prototype.getAlias = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Model} returns this
 */
proto.gooseai.Model.prototype.setAlias = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.CutoutParameters.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.CutoutParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.CutoutParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.CutoutParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.CutoutParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      cutoutsList: jspb.Message.toObjectList(msg.getCutoutsList(),
        proto.gooseai.CutoutParameters.toObject, includeInstance),
      count: jspb.Message.getFieldWithDefault(msg, 2, 0),
      gray: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
      blur: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
      sizePower: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.CutoutParameters}
 */
proto.gooseai.CutoutParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.CutoutParameters;
  return proto.gooseai.CutoutParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.CutoutParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.CutoutParameters}
 */
proto.gooseai.CutoutParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.gooseai.CutoutParameters;
        reader.readMessage(value,proto.gooseai.CutoutParameters.deserializeBinaryFromReader);
        msg.addCutouts(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setCount(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setGray(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setBlur(value);
        break;
      case 5:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setSizePower(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.CutoutParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.CutoutParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.CutoutParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.CutoutParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCutoutsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gooseai.CutoutParameters.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeFloat(
      5,
      f
    );
  }
};


/**
 * repeated CutoutParameters cutouts = 1;
 * @return {!Array<!proto.gooseai.CutoutParameters>}
 */
proto.gooseai.CutoutParameters.prototype.getCutoutsList = function() {
  return /** @type{!Array<!proto.gooseai.CutoutParameters>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.CutoutParameters, 1));
};


/**
 * @param {!Array<!proto.gooseai.CutoutParameters>} value
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.setCutoutsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gooseai.CutoutParameters=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.CutoutParameters}
 */
proto.gooseai.CutoutParameters.prototype.addCutouts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gooseai.CutoutParameters, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.clearCutoutsList = function() {
  return this.setCutoutsList([]);
};


/**
 * optional uint32 count = 2;
 * @return {number}
 */
proto.gooseai.CutoutParameters.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.setCount = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.clearCount = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CutoutParameters.prototype.hasCount = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float gray = 3;
 * @return {number}
 */
proto.gooseai.CutoutParameters.prototype.getGray = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.setGray = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.clearGray = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CutoutParameters.prototype.hasGray = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional float blur = 4;
 * @return {number}
 */
proto.gooseai.CutoutParameters.prototype.getBlur = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.setBlur = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.clearBlur = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CutoutParameters.prototype.hasBlur = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional float size_power = 5;
 * @return {number}
 */
proto.gooseai.CutoutParameters.prototype.getSizePower = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.setSizePower = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CutoutParameters} returns this
 */
proto.gooseai.CutoutParameters.prototype.clearSizePower = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CutoutParameters.prototype.hasSizePower = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.GuidanceScheduleParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.GuidanceScheduleParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.GuidanceScheduleParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.GuidanceScheduleParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      duration: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      value: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.GuidanceScheduleParameters}
 */
proto.gooseai.GuidanceScheduleParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.GuidanceScheduleParameters;
  return proto.gooseai.GuidanceScheduleParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.GuidanceScheduleParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.GuidanceScheduleParameters}
 */
proto.gooseai.GuidanceScheduleParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setDuration(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setValue(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.GuidanceScheduleParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.GuidanceScheduleParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.GuidanceScheduleParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.GuidanceScheduleParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDuration();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getValue();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional float duration = 1;
 * @return {number}
 */
proto.gooseai.GuidanceScheduleParameters.prototype.getDuration = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.GuidanceScheduleParameters} returns this
 */
proto.gooseai.GuidanceScheduleParameters.prototype.setDuration = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional float value = 2;
 * @return {number}
 */
proto.gooseai.GuidanceScheduleParameters.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.GuidanceScheduleParameters} returns this
 */
proto.gooseai.GuidanceScheduleParameters.prototype.setValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.GuidanceInstanceParameters.repeatedFields_ = [2,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.GuidanceInstanceParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.GuidanceInstanceParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.GuidanceInstanceParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.GuidanceInstanceParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      modelsList: jspb.Message.toObjectList(msg.getModelsList(),
        proto.gooseai.Model.toObject, includeInstance),
      guidanceStrength: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
      scheduleList: jspb.Message.toObjectList(msg.getScheduleList(),
        proto.gooseai.GuidanceScheduleParameters.toObject, includeInstance),
      cutouts: (f = msg.getCutouts()) && proto.gooseai.CutoutParameters.toObject(includeInstance, f),
      prompt: (f = msg.getPrompt()) && proto.gooseai.Prompt.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.GuidanceInstanceParameters}
 */
proto.gooseai.GuidanceInstanceParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.GuidanceInstanceParameters;
  return proto.gooseai.GuidanceInstanceParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.GuidanceInstanceParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.GuidanceInstanceParameters}
 */
proto.gooseai.GuidanceInstanceParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 2:
        var value = new proto.gooseai.Model;
        reader.readMessage(value,proto.gooseai.Model.deserializeBinaryFromReader);
        msg.addModels(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setGuidanceStrength(value);
        break;
      case 4:
        var value = new proto.gooseai.GuidanceScheduleParameters;
        reader.readMessage(value,proto.gooseai.GuidanceScheduleParameters.deserializeBinaryFromReader);
        msg.addSchedule(value);
        break;
      case 5:
        var value = new proto.gooseai.CutoutParameters;
        reader.readMessage(value,proto.gooseai.CutoutParameters.deserializeBinaryFromReader);
        msg.setCutouts(value);
        break;
      case 6:
        var value = new proto.gooseai.Prompt;
        reader.readMessage(value,proto.gooseai.Prompt.deserializeBinaryFromReader);
        msg.setPrompt(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.GuidanceInstanceParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.GuidanceInstanceParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.GuidanceInstanceParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModelsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.Model.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getScheduleList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.gooseai.GuidanceScheduleParameters.serializeBinaryToWriter
    );
  }
  f = message.getCutouts();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gooseai.CutoutParameters.serializeBinaryToWriter
    );
  }
  f = message.getPrompt();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.Prompt.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Model models = 2;
 * @return {!Array<!proto.gooseai.Model>}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.getModelsList = function() {
  return /** @type{!Array<!proto.gooseai.Model>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Model, 2));
};


/**
 * @param {!Array<!proto.gooseai.Model>} value
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.setModelsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.Model=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Model}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.addModels = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.Model, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.clearModelsList = function() {
  return this.setModelsList([]);
};


/**
 * optional float guidance_strength = 3;
 * @return {number}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.getGuidanceStrength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.setGuidanceStrength = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.clearGuidanceStrength = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.hasGuidanceStrength = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated GuidanceScheduleParameters schedule = 4;
 * @return {!Array<!proto.gooseai.GuidanceScheduleParameters>}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.getScheduleList = function() {
  return /** @type{!Array<!proto.gooseai.GuidanceScheduleParameters>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.GuidanceScheduleParameters, 4));
};


/**
 * @param {!Array<!proto.gooseai.GuidanceScheduleParameters>} value
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.setScheduleList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.gooseai.GuidanceScheduleParameters=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.GuidanceScheduleParameters}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.addSchedule = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.gooseai.GuidanceScheduleParameters, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.clearScheduleList = function() {
  return this.setScheduleList([]);
};


/**
 * optional CutoutParameters cutouts = 5;
 * @return {?proto.gooseai.CutoutParameters}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.getCutouts = function() {
  return /** @type{?proto.gooseai.CutoutParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.CutoutParameters, 5));
};


/**
 * @param {?proto.gooseai.CutoutParameters|undefined} value
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.setCutouts = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.clearCutouts = function() {
  return this.setCutouts(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.hasCutouts = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Prompt prompt = 6;
 * @return {?proto.gooseai.Prompt}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.getPrompt = function() {
  return /** @type{?proto.gooseai.Prompt} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Prompt, 6));
};


/**
 * @param {?proto.gooseai.Prompt|undefined} value
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.setPrompt = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.GuidanceInstanceParameters} returns this
 */
proto.gooseai.GuidanceInstanceParameters.prototype.clearPrompt = function() {
  return this.setPrompt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.GuidanceInstanceParameters.prototype.hasPrompt = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.GuidanceParameters.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.GuidanceParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.GuidanceParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.GuidanceParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.GuidanceParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      guidancePreset: jspb.Message.getFieldWithDefault(msg, 1, 0),
      instancesList: jspb.Message.toObjectList(msg.getInstancesList(),
        proto.gooseai.GuidanceInstanceParameters.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.GuidanceParameters}
 */
proto.gooseai.GuidanceParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.GuidanceParameters;
  return proto.gooseai.GuidanceParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.GuidanceParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.GuidanceParameters}
 */
proto.gooseai.GuidanceParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.GuidancePreset} */ (reader.readEnum());
        msg.setGuidancePreset(value);
        break;
      case 2:
        var value = new proto.gooseai.GuidanceInstanceParameters;
        reader.readMessage(value,proto.gooseai.GuidanceInstanceParameters.deserializeBinaryFromReader);
        msg.addInstances(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.GuidanceParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.GuidanceParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.GuidanceParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.GuidanceParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGuidancePreset();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getInstancesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.GuidanceInstanceParameters.serializeBinaryToWriter
    );
  }
};


/**
 * optional GuidancePreset guidance_preset = 1;
 * @return {!proto.gooseai.GuidancePreset}
 */
proto.gooseai.GuidanceParameters.prototype.getGuidancePreset = function() {
  return /** @type {!proto.gooseai.GuidancePreset} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.GuidancePreset} value
 * @return {!proto.gooseai.GuidanceParameters} returns this
 */
proto.gooseai.GuidanceParameters.prototype.setGuidancePreset = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * repeated GuidanceInstanceParameters instances = 2;
 * @return {!Array<!proto.gooseai.GuidanceInstanceParameters>}
 */
proto.gooseai.GuidanceParameters.prototype.getInstancesList = function() {
  return /** @type{!Array<!proto.gooseai.GuidanceInstanceParameters>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.GuidanceInstanceParameters, 2));
};


/**
 * @param {!Array<!proto.gooseai.GuidanceInstanceParameters>} value
 * @return {!proto.gooseai.GuidanceParameters} returns this
 */
proto.gooseai.GuidanceParameters.prototype.setInstancesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.GuidanceInstanceParameters=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.GuidanceInstanceParameters}
 */
proto.gooseai.GuidanceParameters.prototype.addInstances = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.GuidanceInstanceParameters, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.GuidanceParameters} returns this
 */
proto.gooseai.GuidanceParameters.prototype.clearInstancesList = function() {
  return this.setInstancesList([]);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.TransformType.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.gooseai.TransformType.TypeCase = {
  TYPE_NOT_SET: 0,
  DIFFUSION: 1,
  UPSCALER: 2
};

/**
 * @return {proto.gooseai.TransformType.TypeCase}
 */
proto.gooseai.TransformType.prototype.getTypeCase = function() {
  return /** @type {proto.gooseai.TransformType.TypeCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.TransformType.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformType.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformType.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformType} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformType.toObject = function(includeInstance, msg) {
    var f, obj = {
      diffusion: jspb.Message.getFieldWithDefault(msg, 1, 0),
      upscaler: jspb.Message.getFieldWithDefault(msg, 2, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformType}
 */
proto.gooseai.TransformType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformType;
  return proto.gooseai.TransformType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformType}
 */
proto.gooseai.TransformType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.DiffusionSampler} */ (reader.readEnum());
        msg.setDiffusion(value);
        break;
      case 2:
        var value = /** @type {!proto.gooseai.Upscaler} */ (reader.readEnum());
        msg.setUpscaler(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformType.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformType} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformType.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.gooseai.DiffusionSampler} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = /** @type {!proto.gooseai.Upscaler} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional DiffusionSampler diffusion = 1;
 * @return {!proto.gooseai.DiffusionSampler}
 */
proto.gooseai.TransformType.prototype.getDiffusion = function() {
  return /** @type {!proto.gooseai.DiffusionSampler} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.DiffusionSampler} value
 * @return {!proto.gooseai.TransformType} returns this
 */
proto.gooseai.TransformType.prototype.setDiffusion = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.gooseai.TransformType.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformType} returns this
 */
proto.gooseai.TransformType.prototype.clearDiffusion = function() {
  return jspb.Message.setOneofField(this, 1, proto.gooseai.TransformType.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformType.prototype.hasDiffusion = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Upscaler upscaler = 2;
 * @return {!proto.gooseai.Upscaler}
 */
proto.gooseai.TransformType.prototype.getUpscaler = function() {
  return /** @type {!proto.gooseai.Upscaler} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gooseai.Upscaler} value
 * @return {!proto.gooseai.TransformType} returns this
 */
proto.gooseai.TransformType.prototype.setUpscaler = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.gooseai.TransformType.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformType} returns this
 */
proto.gooseai.TransformType.prototype.clearUpscaler = function() {
  return jspb.Message.setOneofField(this, 2, proto.gooseai.TransformType.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformType.prototype.hasUpscaler = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.T2IAdapterParameter.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.T2IAdapterParameter.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.T2IAdapterParameter} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.T2IAdapterParameter.toObject = function(includeInstance, msg) {
    var f, obj = {
      adapterType: jspb.Message.getFieldWithDefault(msg, 1, 0),
      adapterStrength: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
      adapterInitType: jspb.Message.getFieldWithDefault(msg, 3, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.T2IAdapterParameter}
 */
proto.gooseai.T2IAdapterParameter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.T2IAdapterParameter;
  return proto.gooseai.T2IAdapterParameter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.T2IAdapterParameter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.T2IAdapterParameter}
 */
proto.gooseai.T2IAdapterParameter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.T2IAdapter} */ (reader.readEnum());
        msg.setAdapterType(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setAdapterStrength(value);
        break;
      case 3:
        var value = /** @type {!proto.gooseai.T2IAdapterInit} */ (reader.readEnum());
        msg.setAdapterInitType(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.T2IAdapterParameter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.T2IAdapterParameter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.T2IAdapterParameter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.T2IAdapterParameter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAdapterType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getAdapterStrength();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getAdapterInitType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional T2IAdapter adapter_type = 1;
 * @return {!proto.gooseai.T2IAdapter}
 */
proto.gooseai.T2IAdapterParameter.prototype.getAdapterType = function() {
  return /** @type {!proto.gooseai.T2IAdapter} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.T2IAdapter} value
 * @return {!proto.gooseai.T2IAdapterParameter} returns this
 */
proto.gooseai.T2IAdapterParameter.prototype.setAdapterType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional float adapter_strength = 2;
 * @return {number}
 */
proto.gooseai.T2IAdapterParameter.prototype.getAdapterStrength = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.T2IAdapterParameter} returns this
 */
proto.gooseai.T2IAdapterParameter.prototype.setAdapterStrength = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional T2IAdapterInit adapter_init_type = 3;
 * @return {!proto.gooseai.T2IAdapterInit}
 */
proto.gooseai.T2IAdapterParameter.prototype.getAdapterInitType = function() {
  return /** @type {!proto.gooseai.T2IAdapterInit} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gooseai.T2IAdapterInit} value
 * @return {!proto.gooseai.T2IAdapterParameter} returns this
 */
proto.gooseai.T2IAdapterParameter.prototype.setAdapterInitType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.CAIParameters.oneofGroups_ = [[1]];

/**
 * @enum {number}
 */
proto.gooseai.CAIParameters.ParametersCase = {
  PARAMETERS_NOT_SET: 0,
  MODEL_METADATA: 1
};

/**
 * @return {proto.gooseai.CAIParameters.ParametersCase}
 */
proto.gooseai.CAIParameters.prototype.getParametersCase = function() {
  return /** @type {proto.gooseai.CAIParameters.ParametersCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.CAIParameters.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.CAIParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.CAIParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.CAIParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.CAIParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      modelMetadata: jspb.Message.getFieldWithDefault(msg, 1, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.CAIParameters}
 */
proto.gooseai.CAIParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.CAIParameters;
  return proto.gooseai.CAIParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.CAIParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.CAIParameters}
 */
proto.gooseai.CAIParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.CAIParameters.ModelMetadata} */ (reader.readEnum());
        msg.setModelMetadata(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.CAIParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.CAIParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.CAIParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.CAIParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.gooseai.CAIParameters.ModelMetadata} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gooseai.CAIParameters.ModelMetadata = {
  MODEL_METADATA_UNSPECIFIED: 0,
  MODEL_METADATA_SIGN_WITH_ENGINE_ID: 1
};

/**
 * optional ModelMetadata model_metadata = 1;
 * @return {!proto.gooseai.CAIParameters.ModelMetadata}
 */
proto.gooseai.CAIParameters.prototype.getModelMetadata = function() {
  return /** @type {!proto.gooseai.CAIParameters.ModelMetadata} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.CAIParameters.ModelMetadata} value
 * @return {!proto.gooseai.CAIParameters} returns this
 */
proto.gooseai.CAIParameters.prototype.setModelMetadata = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.gooseai.CAIParameters.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CAIParameters} returns this
 */
proto.gooseai.CAIParameters.prototype.clearModelMetadata = function() {
  return jspb.Message.setOneofField(this, 1, proto.gooseai.CAIParameters.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CAIParameters.prototype.hasModelMetadata = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.FineTuningParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.FineTuningParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.FineTuningParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.FineTuningParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      modelId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      weight: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.FineTuningParameters}
 */
proto.gooseai.FineTuningParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.FineTuningParameters;
  return proto.gooseai.FineTuningParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.FineTuningParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.FineTuningParameters}
 */
proto.gooseai.FineTuningParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setModelId(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setWeight(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.FineTuningParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.FineTuningParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.FineTuningParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.FineTuningParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModelId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional string model_id = 1;
 * @return {string}
 */
proto.gooseai.FineTuningParameters.prototype.getModelId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.FineTuningParameters} returns this
 */
proto.gooseai.FineTuningParameters.prototype.setModelId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional float weight = 2;
 * @return {number}
 */
proto.gooseai.FineTuningParameters.prototype.getWeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.FineTuningParameters} returns this
 */
proto.gooseai.FineTuningParameters.prototype.setWeight = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.FineTuningParameters} returns this
 */
proto.gooseai.FineTuningParameters.prototype.clearWeight = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.FineTuningParameters.prototype.hasWeight = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.ImageParameters.repeatedFields_ = [3,7,13];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ImageParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ImageParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ImageParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ImageParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      height: jspb.Message.getFieldWithDefault(msg, 1, 0),
      width: jspb.Message.getFieldWithDefault(msg, 2, 0),
      seedList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
      samples: jspb.Message.getFieldWithDefault(msg, 4, 0),
      steps: jspb.Message.getFieldWithDefault(msg, 5, 0),
      transform: (f = msg.getTransform()) && proto.gooseai.TransformType.toObject(includeInstance, f),
      parametersList: jspb.Message.toObjectList(msg.getParametersList(),
        proto.gooseai.StepParameter.toObject, includeInstance),
      maskedAreaInit: jspb.Message.getFieldWithDefault(msg, 8, 0),
      weightMethod: jspb.Message.getFieldWithDefault(msg, 9, 0),
      quantize: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
      caiParameters: (f = msg.getCaiParameters()) && proto.gooseai.CAIParameters.toObject(includeInstance, f),
      adapter: (f = msg.getAdapter()) && proto.gooseai.T2IAdapterParameter.toObject(includeInstance, f),
      fineTuningParametersList: jspb.Message.toObjectList(msg.getFineTuningParametersList(),
        proto.gooseai.FineTuningParameters.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ImageParameters}
 */
proto.gooseai.ImageParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ImageParameters;
  return proto.gooseai.ImageParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ImageParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ImageParameters}
 */
proto.gooseai.ImageParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setHeight(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setWidth(value);
        break;
      case 3:
        var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
        for (var i = 0; i < values.length; i++) {
          msg.addSeed(values[i]);
        }
        break;
      case 4:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setSamples(value);
        break;
      case 5:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setSteps(value);
        break;
      case 6:
        var value = new proto.gooseai.TransformType;
        reader.readMessage(value,proto.gooseai.TransformType.deserializeBinaryFromReader);
        msg.setTransform(value);
        break;
      case 7:
        var value = new proto.gooseai.StepParameter;
        reader.readMessage(value,proto.gooseai.StepParameter.deserializeBinaryFromReader);
        msg.addParameters(value);
        break;
      case 8:
        var value = /** @type {!proto.gooseai.MaskedAreaInit} */ (reader.readEnum());
        msg.setMaskedAreaInit(value);
        break;
      case 9:
        var value = /** @type {!proto.gooseai.WeightMethod} */ (reader.readEnum());
        msg.setWeightMethod(value);
        break;
      case 10:
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setQuantize(value);
        break;
      case 11:
        var value = new proto.gooseai.CAIParameters;
        reader.readMessage(value,proto.gooseai.CAIParameters.deserializeBinaryFromReader);
        msg.setCaiParameters(value);
        break;
      case 12:
        var value = new proto.gooseai.T2IAdapterParameter;
        reader.readMessage(value,proto.gooseai.T2IAdapterParameter.deserializeBinaryFromReader);
        msg.setAdapter(value);
        break;
      case 13:
        var value = new proto.gooseai.FineTuningParameters;
        reader.readMessage(value,proto.gooseai.FineTuningParameters.deserializeBinaryFromReader);
        msg.addFineTuningParameters(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ImageParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ImageParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ImageParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ImageParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getSeedList();
  if (f.length > 0) {
    writer.writePackedUint32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeUint64(
      5,
      f
    );
  }
  f = message.getTransform();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.TransformType.serializeBinaryToWriter
    );
  }
  f = message.getParametersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.gooseai.StepParameter.serializeBinaryToWriter
    );
  }
  f = /** @type {!proto.gooseai.MaskedAreaInit} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = /** @type {!proto.gooseai.WeightMethod} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getCaiParameters();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.gooseai.CAIParameters.serializeBinaryToWriter
    );
  }
  f = message.getAdapter();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.gooseai.T2IAdapterParameter.serializeBinaryToWriter
    );
  }
  f = message.getFineTuningParametersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      13,
      f,
      proto.gooseai.FineTuningParameters.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 height = 1;
 * @return {number}
 */
proto.gooseai.ImageParameters.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setHeight = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearHeight = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 width = 2;
 * @return {number}
 */
proto.gooseai.ImageParameters.prototype.getWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setWidth = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearWidth = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasWidth = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated uint32 seed = 3;
 * @return {!Array<number>}
 */
proto.gooseai.ImageParameters.prototype.getSeedList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setSeedList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.addSeed = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearSeedList = function() {
  return this.setSeedList([]);
};


/**
 * optional uint64 samples = 4;
 * @return {number}
 */
proto.gooseai.ImageParameters.prototype.getSamples = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setSamples = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearSamples = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasSamples = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint64 steps = 5;
 * @return {number}
 */
proto.gooseai.ImageParameters.prototype.getSteps = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setSteps = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearSteps = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasSteps = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional TransformType transform = 6;
 * @return {?proto.gooseai.TransformType}
 */
proto.gooseai.ImageParameters.prototype.getTransform = function() {
  return /** @type{?proto.gooseai.TransformType} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformType, 6));
};


/**
 * @param {?proto.gooseai.TransformType|undefined} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setTransform = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearTransform = function() {
  return this.setTransform(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasTransform = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated StepParameter parameters = 7;
 * @return {!Array<!proto.gooseai.StepParameter>}
 */
proto.gooseai.ImageParameters.prototype.getParametersList = function() {
  return /** @type{!Array<!proto.gooseai.StepParameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.StepParameter, 7));
};


/**
 * @param {!Array<!proto.gooseai.StepParameter>} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setParametersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.gooseai.StepParameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.StepParameter}
 */
proto.gooseai.ImageParameters.prototype.addParameters = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.gooseai.StepParameter, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearParametersList = function() {
  return this.setParametersList([]);
};


/**
 * optional MaskedAreaInit masked_area_init = 8;
 * @return {!proto.gooseai.MaskedAreaInit}
 */
proto.gooseai.ImageParameters.prototype.getMaskedAreaInit = function() {
  return /** @type {!proto.gooseai.MaskedAreaInit} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {!proto.gooseai.MaskedAreaInit} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setMaskedAreaInit = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearMaskedAreaInit = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasMaskedAreaInit = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional WeightMethod weight_method = 9;
 * @return {!proto.gooseai.WeightMethod}
 */
proto.gooseai.ImageParameters.prototype.getWeightMethod = function() {
  return /** @type {!proto.gooseai.WeightMethod} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.gooseai.WeightMethod} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setWeightMethod = function(value) {
  return jspb.Message.setField(this, 9, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearWeightMethod = function() {
  return jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasWeightMethod = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional bool quantize = 10;
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.getQuantize = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setQuantize = function(value) {
  return jspb.Message.setField(this, 10, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearQuantize = function() {
  return jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasQuantize = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional CAIParameters cai_parameters = 11;
 * @return {?proto.gooseai.CAIParameters}
 */
proto.gooseai.ImageParameters.prototype.getCaiParameters = function() {
  return /** @type{?proto.gooseai.CAIParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.CAIParameters, 11));
};


/**
 * @param {?proto.gooseai.CAIParameters|undefined} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setCaiParameters = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearCaiParameters = function() {
  return this.setCaiParameters(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasCaiParameters = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional T2IAdapterParameter adapter = 12;
 * @return {?proto.gooseai.T2IAdapterParameter}
 */
proto.gooseai.ImageParameters.prototype.getAdapter = function() {
  return /** @type{?proto.gooseai.T2IAdapterParameter} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.T2IAdapterParameter, 12));
};


/**
 * @param {?proto.gooseai.T2IAdapterParameter|undefined} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setAdapter = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearAdapter = function() {
  return this.setAdapter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ImageParameters.prototype.hasAdapter = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * repeated FineTuningParameters fine_tuning_parameters = 13;
 * @return {!Array<!proto.gooseai.FineTuningParameters>}
 */
proto.gooseai.ImageParameters.prototype.getFineTuningParametersList = function() {
  return /** @type{!Array<!proto.gooseai.FineTuningParameters>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.FineTuningParameters, 13));
};


/**
 * @param {!Array<!proto.gooseai.FineTuningParameters>} value
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.setFineTuningParametersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 13, value);
};


/**
 * @param {!proto.gooseai.FineTuningParameters=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.FineTuningParameters}
 */
proto.gooseai.ImageParameters.prototype.addFineTuningParameters = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 13, opt_value, proto.gooseai.FineTuningParameters, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ImageParameters} returns this
 */
proto.gooseai.ImageParameters.prototype.clearFineTuningParametersList = function() {
  return this.setFineTuningParametersList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ClassifierConcept.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ClassifierConcept.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ClassifierConcept} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ClassifierConcept.toObject = function(includeInstance, msg) {
    var f, obj = {
      concept: jspb.Message.getFieldWithDefault(msg, 1, ""),
      threshold: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ClassifierConcept}
 */
proto.gooseai.ClassifierConcept.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ClassifierConcept;
  return proto.gooseai.ClassifierConcept.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ClassifierConcept} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ClassifierConcept}
 */
proto.gooseai.ClassifierConcept.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setConcept(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setThreshold(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ClassifierConcept.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ClassifierConcept.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ClassifierConcept} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ClassifierConcept.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConcept();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
};


/**
 * optional string concept = 1;
 * @return {string}
 */
proto.gooseai.ClassifierConcept.prototype.getConcept = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.ClassifierConcept} returns this
 */
proto.gooseai.ClassifierConcept.prototype.setConcept = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional float threshold = 2;
 * @return {number}
 */
proto.gooseai.ClassifierConcept.prototype.getThreshold = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ClassifierConcept} returns this
 */
proto.gooseai.ClassifierConcept.prototype.setThreshold = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ClassifierConcept} returns this
 */
proto.gooseai.ClassifierConcept.prototype.clearThreshold = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ClassifierConcept.prototype.hasThreshold = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.ClassifierCategory.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ClassifierCategory.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ClassifierCategory.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ClassifierCategory} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ClassifierCategory.toObject = function(includeInstance, msg) {
    var f, obj = {
      name: jspb.Message.getFieldWithDefault(msg, 1, ""),
      conceptsList: jspb.Message.toObjectList(msg.getConceptsList(),
        proto.gooseai.ClassifierConcept.toObject, includeInstance),
      adjustment: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
      action: jspb.Message.getFieldWithDefault(msg, 4, 0),
      classifierMode: jspb.Message.getFieldWithDefault(msg, 5, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ClassifierCategory}
 */
proto.gooseai.ClassifierCategory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ClassifierCategory;
  return proto.gooseai.ClassifierCategory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ClassifierCategory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ClassifierCategory}
 */
proto.gooseai.ClassifierCategory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setName(value);
        break;
      case 2:
        var value = new proto.gooseai.ClassifierConcept;
        reader.readMessage(value,proto.gooseai.ClassifierConcept.deserializeBinaryFromReader);
        msg.addConcepts(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setAdjustment(value);
        break;
      case 4:
        var value = /** @type {!proto.gooseai.Action} */ (reader.readEnum());
        msg.setAction(value);
        break;
      case 5:
        var value = /** @type {!proto.gooseai.ClassifierMode} */ (reader.readEnum());
        msg.setClassifierMode(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ClassifierCategory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ClassifierCategory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ClassifierCategory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ClassifierCategory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConceptsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.ClassifierConcept.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = /** @type {!proto.gooseai.Action} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = /** @type {!proto.gooseai.ClassifierMode} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.gooseai.ClassifierCategory.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated ClassifierConcept concepts = 2;
 * @return {!Array<!proto.gooseai.ClassifierConcept>}
 */
proto.gooseai.ClassifierCategory.prototype.getConceptsList = function() {
  return /** @type{!Array<!proto.gooseai.ClassifierConcept>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.ClassifierConcept, 2));
};


/**
 * @param {!Array<!proto.gooseai.ClassifierConcept>} value
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.setConceptsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.ClassifierConcept=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.ClassifierConcept}
 */
proto.gooseai.ClassifierCategory.prototype.addConcepts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.ClassifierConcept, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.clearConceptsList = function() {
  return this.setConceptsList([]);
};


/**
 * optional float adjustment = 3;
 * @return {number}
 */
proto.gooseai.ClassifierCategory.prototype.getAdjustment = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.setAdjustment = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.clearAdjustment = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ClassifierCategory.prototype.hasAdjustment = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Action action = 4;
 * @return {!proto.gooseai.Action}
 */
proto.gooseai.ClassifierCategory.prototype.getAction = function() {
  return /** @type {!proto.gooseai.Action} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.gooseai.Action} value
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.setAction = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.clearAction = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ClassifierCategory.prototype.hasAction = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ClassifierMode classifier_mode = 5;
 * @return {!proto.gooseai.ClassifierMode}
 */
proto.gooseai.ClassifierCategory.prototype.getClassifierMode = function() {
  return /** @type {!proto.gooseai.ClassifierMode} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.gooseai.ClassifierMode} value
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.setClassifierMode = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ClassifierCategory} returns this
 */
proto.gooseai.ClassifierCategory.prototype.clearClassifierMode = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ClassifierCategory.prototype.hasClassifierMode = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.ClassifierParameters.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ClassifierParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ClassifierParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ClassifierParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ClassifierParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      categoriesList: jspb.Message.toObjectList(msg.getCategoriesList(),
        proto.gooseai.ClassifierCategory.toObject, includeInstance),
      exceedsList: jspb.Message.toObjectList(msg.getExceedsList(),
        proto.gooseai.ClassifierCategory.toObject, includeInstance),
      realizedAction: jspb.Message.getFieldWithDefault(msg, 3, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ClassifierParameters}
 */
proto.gooseai.ClassifierParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ClassifierParameters;
  return proto.gooseai.ClassifierParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ClassifierParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ClassifierParameters}
 */
proto.gooseai.ClassifierParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.gooseai.ClassifierCategory;
        reader.readMessage(value,proto.gooseai.ClassifierCategory.deserializeBinaryFromReader);
        msg.addCategories(value);
        break;
      case 2:
        var value = new proto.gooseai.ClassifierCategory;
        reader.readMessage(value,proto.gooseai.ClassifierCategory.deserializeBinaryFromReader);
        msg.addExceeds(value);
        break;
      case 3:
        var value = /** @type {!proto.gooseai.Action} */ (reader.readEnum());
        msg.setRealizedAction(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ClassifierParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ClassifierParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ClassifierParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ClassifierParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCategoriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gooseai.ClassifierCategory.serializeBinaryToWriter
    );
  }
  f = message.getExceedsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.ClassifierCategory.serializeBinaryToWriter
    );
  }
  f = /** @type {!proto.gooseai.Action} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * repeated ClassifierCategory categories = 1;
 * @return {!Array<!proto.gooseai.ClassifierCategory>}
 */
proto.gooseai.ClassifierParameters.prototype.getCategoriesList = function() {
  return /** @type{!Array<!proto.gooseai.ClassifierCategory>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.ClassifierCategory, 1));
};


/**
 * @param {!Array<!proto.gooseai.ClassifierCategory>} value
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.setCategoriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gooseai.ClassifierCategory=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.ClassifierCategory}
 */
proto.gooseai.ClassifierParameters.prototype.addCategories = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gooseai.ClassifierCategory, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.clearCategoriesList = function() {
  return this.setCategoriesList([]);
};


/**
 * repeated ClassifierCategory exceeds = 2;
 * @return {!Array<!proto.gooseai.ClassifierCategory>}
 */
proto.gooseai.ClassifierParameters.prototype.getExceedsList = function() {
  return /** @type{!Array<!proto.gooseai.ClassifierCategory>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.ClassifierCategory, 2));
};


/**
 * @param {!Array<!proto.gooseai.ClassifierCategory>} value
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.setExceedsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.ClassifierCategory=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.ClassifierCategory}
 */
proto.gooseai.ClassifierParameters.prototype.addExceeds = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.ClassifierCategory, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.clearExceedsList = function() {
  return this.setExceedsList([]);
};


/**
 * optional Action realized_action = 3;
 * @return {!proto.gooseai.Action}
 */
proto.gooseai.ClassifierParameters.prototype.getRealizedAction = function() {
  return /** @type {!proto.gooseai.Action} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gooseai.Action} value
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.setRealizedAction = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.ClassifierParameters} returns this
 */
proto.gooseai.ClassifierParameters.prototype.clearRealizedAction = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.ClassifierParameters.prototype.hasRealizedAction = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.InterpolateParameters.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.InterpolateParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.InterpolateParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.InterpolateParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.InterpolateParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      ratiosList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 1)) == null ? undefined : f,
      mode: jspb.Message.getFieldWithDefault(msg, 2, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.InterpolateParameters}
 */
proto.gooseai.InterpolateParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.InterpolateParameters;
  return proto.gooseai.InterpolateParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.InterpolateParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.InterpolateParameters}
 */
proto.gooseai.InterpolateParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedFloat() : [reader.readFloat()]);
        for (var i = 0; i < values.length; i++) {
          msg.addRatios(values[i]);
        }
        break;
      case 2:
        var value = /** @type {!proto.gooseai.InterpolateMode} */ (reader.readEnum());
        msg.setMode(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.InterpolateParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.InterpolateParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.InterpolateParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.InterpolateParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRatiosList();
  if (f.length > 0) {
    writer.writePackedFloat(
      1,
      f
    );
  }
  f = /** @type {!proto.gooseai.InterpolateMode} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * repeated float ratios = 1;
 * @return {!Array<number>}
 */
proto.gooseai.InterpolateParameters.prototype.getRatiosList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gooseai.InterpolateParameters} returns this
 */
proto.gooseai.InterpolateParameters.prototype.setRatiosList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gooseai.InterpolateParameters} returns this
 */
proto.gooseai.InterpolateParameters.prototype.addRatios = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.InterpolateParameters} returns this
 */
proto.gooseai.InterpolateParameters.prototype.clearRatiosList = function() {
  return this.setRatiosList([]);
};


/**
 * optional InterpolateMode mode = 2;
 * @return {!proto.gooseai.InterpolateMode}
 */
proto.gooseai.InterpolateParameters.prototype.getMode = function() {
  return /** @type {!proto.gooseai.InterpolateMode} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gooseai.InterpolateMode} value
 * @return {!proto.gooseai.InterpolateParameters} returns this
 */
proto.gooseai.InterpolateParameters.prototype.setMode = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.InterpolateParameters} returns this
 */
proto.gooseai.InterpolateParameters.prototype.clearMode = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.InterpolateParameters.prototype.hasMode = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformColorAdjust.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformColorAdjust.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformColorAdjust} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformColorAdjust.toObject = function(includeInstance, msg) {
    var f, obj = {
      brightness: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      contrast: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
      hue: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
      saturation: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
      lightness: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
      matchImage: (f = msg.getMatchImage()) && proto.gooseai.Artifact.toObject(includeInstance, f),
      matchMode: jspb.Message.getFieldWithDefault(msg, 7, 0),
      noiseAmount: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
      noiseSeed: jspb.Message.getFieldWithDefault(msg, 9, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformColorAdjust}
 */
proto.gooseai.TransformColorAdjust.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformColorAdjust;
  return proto.gooseai.TransformColorAdjust.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformColorAdjust} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformColorAdjust}
 */
proto.gooseai.TransformColorAdjust.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setBrightness(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setContrast(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setHue(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setSaturation(value);
        break;
      case 5:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setLightness(value);
        break;
      case 6:
        var value = new proto.gooseai.Artifact;
        reader.readMessage(value,proto.gooseai.Artifact.deserializeBinaryFromReader);
        msg.setMatchImage(value);
        break;
      case 7:
        var value = /** @type {!proto.gooseai.ColorMatchMode} */ (reader.readEnum());
        msg.setMatchMode(value);
        break;
      case 8:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setNoiseAmount(value);
        break;
      case 9:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setNoiseSeed(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformColorAdjust.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformColorAdjust.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformColorAdjust} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformColorAdjust.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getMatchImage();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.Artifact.serializeBinaryToWriter
    );
  }
  f = /** @type {!proto.gooseai.ColorMatchMode} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeEnum(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeFloat(
      8,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeUint32(
      9,
      f
    );
  }
};


/**
 * optional float brightness = 1;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getBrightness = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setBrightness = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearBrightness = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasBrightness = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional float contrast = 2;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getContrast = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setContrast = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearContrast = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasContrast = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional float hue = 3;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getHue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setHue = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearHue = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasHue = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional float saturation = 4;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getSaturation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setSaturation = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearSaturation = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasSaturation = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional float lightness = 5;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getLightness = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setLightness = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearLightness = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasLightness = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Artifact match_image = 6;
 * @return {?proto.gooseai.Artifact}
 */
proto.gooseai.TransformColorAdjust.prototype.getMatchImage = function() {
  return /** @type{?proto.gooseai.Artifact} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Artifact, 6));
};


/**
 * @param {?proto.gooseai.Artifact|undefined} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setMatchImage = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearMatchImage = function() {
  return this.setMatchImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasMatchImage = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ColorMatchMode match_mode = 7;
 * @return {!proto.gooseai.ColorMatchMode}
 */
proto.gooseai.TransformColorAdjust.prototype.getMatchMode = function() {
  return /** @type {!proto.gooseai.ColorMatchMode} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.gooseai.ColorMatchMode} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setMatchMode = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearMatchMode = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasMatchMode = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional float noise_amount = 8;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getNoiseAmount = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setNoiseAmount = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearNoiseAmount = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasNoiseAmount = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional uint32 noise_seed = 9;
 * @return {number}
 */
proto.gooseai.TransformColorAdjust.prototype.getNoiseSeed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.setNoiseSeed = function(value) {
  return jspb.Message.setField(this, 9, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformColorAdjust} returns this
 */
proto.gooseai.TransformColorAdjust.prototype.clearNoiseSeed = function() {
  return jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformColorAdjust.prototype.hasNoiseSeed = function() {
  return jspb.Message.getField(this, 9) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformDepthCalc.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformDepthCalc.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformDepthCalc} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformDepthCalc.toObject = function(includeInstance, msg) {
    var f, obj = {
      blendWeight: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
      blurRadius: jspb.Message.getFieldWithDefault(msg, 2, 0),
      reverse: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformDepthCalc}
 */
proto.gooseai.TransformDepthCalc.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformDepthCalc;
  return proto.gooseai.TransformDepthCalc.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformDepthCalc} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformDepthCalc}
 */
proto.gooseai.TransformDepthCalc.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setBlendWeight(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setBlurRadius(value);
        break;
      case 3:
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setReverse(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformDepthCalc.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformDepthCalc.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformDepthCalc} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformDepthCalc.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional float blend_weight = 1;
 * @return {number}
 */
proto.gooseai.TransformDepthCalc.prototype.getBlendWeight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.setBlendWeight = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.clearBlendWeight = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformDepthCalc.prototype.hasBlendWeight = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint32 blur_radius = 2;
 * @return {number}
 */
proto.gooseai.TransformDepthCalc.prototype.getBlurRadius = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.setBlurRadius = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.clearBlurRadius = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformDepthCalc.prototype.hasBlurRadius = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool reverse = 3;
 * @return {boolean}
 */
proto.gooseai.TransformDepthCalc.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.setReverse = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformDepthCalc} returns this
 */
proto.gooseai.TransformDepthCalc.prototype.clearReverse = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformDepthCalc.prototype.hasReverse = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.TransformMatrix.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformMatrix.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformMatrix.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformMatrix} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformMatrix.toObject = function(includeInstance, msg) {
    var f, obj = {
      dataList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 1)) == null ? undefined : f
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformMatrix}
 */
proto.gooseai.TransformMatrix.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformMatrix;
  return proto.gooseai.TransformMatrix.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformMatrix} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformMatrix}
 */
proto.gooseai.TransformMatrix.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedFloat() : [reader.readFloat()]);
        for (var i = 0; i < values.length; i++) {
          msg.addData(values[i]);
        }
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformMatrix.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformMatrix.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformMatrix} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformMatrix.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDataList();
  if (f.length > 0) {
    writer.writePackedFloat(
      1,
      f
    );
  }
};


/**
 * repeated float data = 1;
 * @return {!Array<number>}
 */
proto.gooseai.TransformMatrix.prototype.getDataList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gooseai.TransformMatrix} returns this
 */
proto.gooseai.TransformMatrix.prototype.setDataList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gooseai.TransformMatrix} returns this
 */
proto.gooseai.TransformMatrix.prototype.addData = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.TransformMatrix} returns this
 */
proto.gooseai.TransformMatrix.prototype.clearDataList = function() {
  return this.setDataList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformResample.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformResample.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformResample} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformResample.toObject = function(includeInstance, msg) {
    var f, obj = {
      borderMode: jspb.Message.getFieldWithDefault(msg, 1, 0),
      transform: (f = msg.getTransform()) && proto.gooseai.TransformMatrix.toObject(includeInstance, f),
      prevTransform: (f = msg.getPrevTransform()) && proto.gooseai.TransformMatrix.toObject(includeInstance, f),
      depthWarp: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
      exportMask: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformResample}
 */
proto.gooseai.TransformResample.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformResample;
  return proto.gooseai.TransformResample.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformResample} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformResample}
 */
proto.gooseai.TransformResample.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.BorderMode} */ (reader.readEnum());
        msg.setBorderMode(value);
        break;
      case 2:
        var value = new proto.gooseai.TransformMatrix;
        reader.readMessage(value,proto.gooseai.TransformMatrix.deserializeBinaryFromReader);
        msg.setTransform(value);
        break;
      case 3:
        var value = new proto.gooseai.TransformMatrix;
        reader.readMessage(value,proto.gooseai.TransformMatrix.deserializeBinaryFromReader);
        msg.setPrevTransform(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setDepthWarp(value);
        break;
      case 5:
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setExportMask(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformResample.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformResample.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformResample} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformResample.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBorderMode();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getTransform();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.TransformMatrix.serializeBinaryToWriter
    );
  }
  f = message.getPrevTransform();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gooseai.TransformMatrix.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional BorderMode border_mode = 1;
 * @return {!proto.gooseai.BorderMode}
 */
proto.gooseai.TransformResample.prototype.getBorderMode = function() {
  return /** @type {!proto.gooseai.BorderMode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.BorderMode} value
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.setBorderMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional TransformMatrix transform = 2;
 * @return {?proto.gooseai.TransformMatrix}
 */
proto.gooseai.TransformResample.prototype.getTransform = function() {
  return /** @type{?proto.gooseai.TransformMatrix} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformMatrix, 2));
};


/**
 * @param {?proto.gooseai.TransformMatrix|undefined} value
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.setTransform = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.clearTransform = function() {
  return this.setTransform(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformResample.prototype.hasTransform = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional TransformMatrix prev_transform = 3;
 * @return {?proto.gooseai.TransformMatrix}
 */
proto.gooseai.TransformResample.prototype.getPrevTransform = function() {
  return /** @type{?proto.gooseai.TransformMatrix} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformMatrix, 3));
};


/**
 * @param {?proto.gooseai.TransformMatrix|undefined} value
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.setPrevTransform = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.clearPrevTransform = function() {
  return this.setPrevTransform(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformResample.prototype.hasPrevTransform = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional float depth_warp = 4;
 * @return {number}
 */
proto.gooseai.TransformResample.prototype.getDepthWarp = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.setDepthWarp = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.clearDepthWarp = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformResample.prototype.hasDepthWarp = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional bool export_mask = 5;
 * @return {boolean}
 */
proto.gooseai.TransformResample.prototype.getExportMask = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.setExportMask = function(value) {
  return jspb.Message.setField(this, 5, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.TransformResample} returns this
 */
proto.gooseai.TransformResample.prototype.clearExportMask = function() {
  return jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformResample.prototype.hasExportMask = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.CameraParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.CameraParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.CameraParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.CameraParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      cameraType: jspb.Message.getFieldWithDefault(msg, 1, 0),
      nearPlane: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
      farPlane: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
      fov: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.CameraParameters}
 */
proto.gooseai.CameraParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.CameraParameters;
  return proto.gooseai.CameraParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.CameraParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.CameraParameters}
 */
proto.gooseai.CameraParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.CameraType} */ (reader.readEnum());
        msg.setCameraType(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setNearPlane(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setFarPlane(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setFov(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.CameraParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.CameraParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.CameraParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.CameraParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCameraType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getNearPlane();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getFarPlane();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * optional CameraType camera_type = 1;
 * @return {!proto.gooseai.CameraType}
 */
proto.gooseai.CameraParameters.prototype.getCameraType = function() {
  return /** @type {!proto.gooseai.CameraType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.CameraType} value
 * @return {!proto.gooseai.CameraParameters} returns this
 */
proto.gooseai.CameraParameters.prototype.setCameraType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional float near_plane = 2;
 * @return {number}
 */
proto.gooseai.CameraParameters.prototype.getNearPlane = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CameraParameters} returns this
 */
proto.gooseai.CameraParameters.prototype.setNearPlane = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float far_plane = 3;
 * @return {number}
 */
proto.gooseai.CameraParameters.prototype.getFarPlane = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CameraParameters} returns this
 */
proto.gooseai.CameraParameters.prototype.setFarPlane = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional float fov = 4;
 * @return {number}
 */
proto.gooseai.CameraParameters.prototype.getFov = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.CameraParameters} returns this
 */
proto.gooseai.CameraParameters.prototype.setFov = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.CameraParameters} returns this
 */
proto.gooseai.CameraParameters.prototype.clearFov = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.CameraParameters.prototype.hasFov = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformCameraPose.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformCameraPose.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformCameraPose} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformCameraPose.toObject = function(includeInstance, msg) {
    var f, obj = {
      worldToViewMatrix: (f = msg.getWorldToViewMatrix()) && proto.gooseai.TransformMatrix.toObject(includeInstance, f),
      cameraParameters: (f = msg.getCameraParameters()) && proto.gooseai.CameraParameters.toObject(includeInstance, f),
      doPrefill: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
      renderMode: jspb.Message.getFieldWithDefault(msg, 8, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformCameraPose}
 */
proto.gooseai.TransformCameraPose.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformCameraPose;
  return proto.gooseai.TransformCameraPose.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformCameraPose} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformCameraPose}
 */
proto.gooseai.TransformCameraPose.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.gooseai.TransformMatrix;
        reader.readMessage(value,proto.gooseai.TransformMatrix.deserializeBinaryFromReader);
        msg.setWorldToViewMatrix(value);
        break;
      case 2:
        var value = new proto.gooseai.CameraParameters;
        reader.readMessage(value,proto.gooseai.CameraParameters.deserializeBinaryFromReader);
        msg.setCameraParameters(value);
        break;
      case 5:
        var value = /** @type {boolean} */ (reader.readBool());
        msg.setDoPrefill(value);
        break;
      case 8:
        var value = /** @type {!proto.gooseai.RenderMode} */ (reader.readEnum());
        msg.setRenderMode(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformCameraPose.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformCameraPose.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformCameraPose} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformCameraPose.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorldToViewMatrix();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gooseai.TransformMatrix.serializeBinaryToWriter
    );
  }
  f = message.getCameraParameters();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.CameraParameters.serializeBinaryToWriter
    );
  }
  f = message.getDoPrefill();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getRenderMode();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
};


/**
 * optional TransformMatrix world_to_view_matrix = 1;
 * @return {?proto.gooseai.TransformMatrix}
 */
proto.gooseai.TransformCameraPose.prototype.getWorldToViewMatrix = function() {
  return /** @type{?proto.gooseai.TransformMatrix} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformMatrix, 1));
};


/**
 * @param {?proto.gooseai.TransformMatrix|undefined} value
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.setWorldToViewMatrix = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.clearWorldToViewMatrix = function() {
  return this.setWorldToViewMatrix(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformCameraPose.prototype.hasWorldToViewMatrix = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CameraParameters camera_parameters = 2;
 * @return {?proto.gooseai.CameraParameters}
 */
proto.gooseai.TransformCameraPose.prototype.getCameraParameters = function() {
  return /** @type{?proto.gooseai.CameraParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.CameraParameters, 2));
};


/**
 * @param {?proto.gooseai.CameraParameters|undefined} value
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.setCameraParameters = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.clearCameraParameters = function() {
  return this.setCameraParameters(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformCameraPose.prototype.hasCameraParameters = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool do_prefill = 5;
 * @return {boolean}
 */
proto.gooseai.TransformCameraPose.prototype.getDoPrefill = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.setDoPrefill = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional RenderMode render_mode = 8;
 * @return {!proto.gooseai.RenderMode}
 */
proto.gooseai.TransformCameraPose.prototype.getRenderMode = function() {
  return /** @type {!proto.gooseai.RenderMode} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {!proto.gooseai.RenderMode} value
 * @return {!proto.gooseai.TransformCameraPose} returns this
 */
proto.gooseai.TransformCameraPose.prototype.setRenderMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 8, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.TransformParameters.oneofGroups_ = [[2,4,5,6]];

/**
 * @enum {number}
 */
proto.gooseai.TransformParameters.TransformCase = {
  TRANSFORM_NOT_SET: 0,
  COLOR_ADJUST: 2,
  DEPTH_CALC: 4,
  RESAMPLE: 5,
  CAMERA_POSE: 6
};

/**
 * @return {proto.gooseai.TransformParameters.TransformCase}
 */
proto.gooseai.TransformParameters.prototype.getTransformCase = function() {
  return /** @type {proto.gooseai.TransformParameters.TransformCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.TransformParameters.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.TransformParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.TransformParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.TransformParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.TransformParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      colorAdjust: (f = msg.getColorAdjust()) && proto.gooseai.TransformColorAdjust.toObject(includeInstance, f),
      depthCalc: (f = msg.getDepthCalc()) && proto.gooseai.TransformDepthCalc.toObject(includeInstance, f),
      resample: (f = msg.getResample()) && proto.gooseai.TransformResample.toObject(includeInstance, f),
      cameraPose: (f = msg.getCameraPose()) && proto.gooseai.TransformCameraPose.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.TransformParameters}
 */
proto.gooseai.TransformParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.TransformParameters;
  return proto.gooseai.TransformParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.TransformParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.TransformParameters}
 */
proto.gooseai.TransformParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 2:
        var value = new proto.gooseai.TransformColorAdjust;
        reader.readMessage(value,proto.gooseai.TransformColorAdjust.deserializeBinaryFromReader);
        msg.setColorAdjust(value);
        break;
      case 4:
        var value = new proto.gooseai.TransformDepthCalc;
        reader.readMessage(value,proto.gooseai.TransformDepthCalc.deserializeBinaryFromReader);
        msg.setDepthCalc(value);
        break;
      case 5:
        var value = new proto.gooseai.TransformResample;
        reader.readMessage(value,proto.gooseai.TransformResample.deserializeBinaryFromReader);
        msg.setResample(value);
        break;
      case 6:
        var value = new proto.gooseai.TransformCameraPose;
        reader.readMessage(value,proto.gooseai.TransformCameraPose.deserializeBinaryFromReader);
        msg.setCameraPose(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.TransformParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.TransformParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.TransformParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.TransformParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getColorAdjust();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.TransformColorAdjust.serializeBinaryToWriter
    );
  }
  f = message.getDepthCalc();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gooseai.TransformDepthCalc.serializeBinaryToWriter
    );
  }
  f = message.getResample();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gooseai.TransformResample.serializeBinaryToWriter
    );
  }
  f = message.getCameraPose();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.TransformCameraPose.serializeBinaryToWriter
    );
  }
};


/**
 * optional TransformColorAdjust color_adjust = 2;
 * @return {?proto.gooseai.TransformColorAdjust}
 */
proto.gooseai.TransformParameters.prototype.getColorAdjust = function() {
  return /** @type{?proto.gooseai.TransformColorAdjust} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformColorAdjust, 2));
};


/**
 * @param {?proto.gooseai.TransformColorAdjust|undefined} value
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.setColorAdjust = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.gooseai.TransformParameters.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.clearColorAdjust = function() {
  return this.setColorAdjust(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformParameters.prototype.hasColorAdjust = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional TransformDepthCalc depth_calc = 4;
 * @return {?proto.gooseai.TransformDepthCalc}
 */
proto.gooseai.TransformParameters.prototype.getDepthCalc = function() {
  return /** @type{?proto.gooseai.TransformDepthCalc} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformDepthCalc, 4));
};


/**
 * @param {?proto.gooseai.TransformDepthCalc|undefined} value
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.setDepthCalc = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.gooseai.TransformParameters.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.clearDepthCalc = function() {
  return this.setDepthCalc(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformParameters.prototype.hasDepthCalc = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional TransformResample resample = 5;
 * @return {?proto.gooseai.TransformResample}
 */
proto.gooseai.TransformParameters.prototype.getResample = function() {
  return /** @type{?proto.gooseai.TransformResample} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformResample, 5));
};


/**
 * @param {?proto.gooseai.TransformResample|undefined} value
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.setResample = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.gooseai.TransformParameters.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.clearResample = function() {
  return this.setResample(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformParameters.prototype.hasResample = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional TransformCameraPose camera_pose = 6;
 * @return {?proto.gooseai.TransformCameraPose}
 */
proto.gooseai.TransformParameters.prototype.getCameraPose = function() {
  return /** @type{?proto.gooseai.TransformCameraPose} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformCameraPose, 6));
};


/**
 * @param {?proto.gooseai.TransformCameraPose|undefined} value
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.setCameraPose = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.gooseai.TransformParameters.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.TransformParameters} returns this
 */
proto.gooseai.TransformParameters.prototype.clearCameraPose = function() {
  return this.setCameraPose(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.TransformParameters.prototype.hasCameraPose = function() {
  return jspb.Message.getField(this, 6) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.AssetParameters.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.AssetParameters.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.AssetParameters} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.AssetParameters.toObject = function(includeInstance, msg) {
    var f, obj = {
      action: jspb.Message.getFieldWithDefault(msg, 1, 0),
      projectId: jspb.Message.getFieldWithDefault(msg, 2, ""),
      use: jspb.Message.getFieldWithDefault(msg, 3, 0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.AssetParameters}
 */
proto.gooseai.AssetParameters.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.AssetParameters;
  return proto.gooseai.AssetParameters.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.AssetParameters} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.AssetParameters}
 */
proto.gooseai.AssetParameters.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.gooseai.AssetAction} */ (reader.readEnum());
        msg.setAction(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setProjectId(value);
        break;
      case 3:
        var value = /** @type {!proto.gooseai.AssetUse} */ (reader.readEnum());
        msg.setUse(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.AssetParameters.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.AssetParameters.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.AssetParameters} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.AssetParameters.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAction();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getProjectId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUse();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional AssetAction action = 1;
 * @return {!proto.gooseai.AssetAction}
 */
proto.gooseai.AssetParameters.prototype.getAction = function() {
  return /** @type {!proto.gooseai.AssetAction} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gooseai.AssetAction} value
 * @return {!proto.gooseai.AssetParameters} returns this
 */
proto.gooseai.AssetParameters.prototype.setAction = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string project_id = 2;
 * @return {string}
 */
proto.gooseai.AssetParameters.prototype.getProjectId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AssetParameters} returns this
 */
proto.gooseai.AssetParameters.prototype.setProjectId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional AssetUse use = 3;
 * @return {!proto.gooseai.AssetUse}
 */
proto.gooseai.AssetParameters.prototype.getUse = function() {
  return /** @type {!proto.gooseai.AssetUse} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gooseai.AssetUse} value
 * @return {!proto.gooseai.AssetParameters} returns this
 */
proto.gooseai.AssetParameters.prototype.setUse = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.AnswerMeta.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.AnswerMeta.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.AnswerMeta} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.AnswerMeta.toObject = function(includeInstance, msg) {
    var f, obj = {
      gpuId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      cpuId: jspb.Message.getFieldWithDefault(msg, 2, ""),
      nodeId: jspb.Message.getFieldWithDefault(msg, 3, ""),
      engineId: jspb.Message.getFieldWithDefault(msg, 4, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.AnswerMeta}
 */
proto.gooseai.AnswerMeta.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.AnswerMeta;
  return proto.gooseai.AnswerMeta.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.AnswerMeta} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.AnswerMeta}
 */
proto.gooseai.AnswerMeta.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setGpuId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setCpuId(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setNodeId(value);
        break;
      case 4:
        var value = /** @type {string} */ (reader.readString());
        msg.setEngineId(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.AnswerMeta.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.AnswerMeta.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.AnswerMeta} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.AnswerMeta.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string gpu_id = 1;
 * @return {string}
 */
proto.gooseai.AnswerMeta.prototype.getGpuId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.setGpuId = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.clearGpuId = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.AnswerMeta.prototype.hasGpuId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string cpu_id = 2;
 * @return {string}
 */
proto.gooseai.AnswerMeta.prototype.getCpuId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.setCpuId = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.clearCpuId = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.AnswerMeta.prototype.hasCpuId = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string node_id = 3;
 * @return {string}
 */
proto.gooseai.AnswerMeta.prototype.getNodeId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.setNodeId = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.clearNodeId = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.AnswerMeta.prototype.hasNodeId = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string engine_id = 4;
 * @return {string}
 */
proto.gooseai.AnswerMeta.prototype.getEngineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.setEngineId = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.AnswerMeta} returns this
 */
proto.gooseai.AnswerMeta.prototype.clearEngineId = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.AnswerMeta.prototype.hasEngineId = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.Answer.repeatedFields_ = [7];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Answer.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Answer.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Answer} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Answer.toObject = function(includeInstance, msg) {
    var f, obj = {
      answerId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      requestId: jspb.Message.getFieldWithDefault(msg, 2, ""),
      received: jspb.Message.getFieldWithDefault(msg, 3, 0),
      created: jspb.Message.getFieldWithDefault(msg, 4, 0),
      meta: (f = msg.getMeta()) && proto.gooseai.AnswerMeta.toObject(includeInstance, f),
      artifactsList: jspb.Message.toObjectList(msg.getArtifactsList(),
        proto.gooseai.Artifact.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Answer}
 */
proto.gooseai.Answer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Answer;
  return proto.gooseai.Answer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Answer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Answer}
 */
proto.gooseai.Answer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setAnswerId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setRequestId(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setReceived(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readUint64());
        msg.setCreated(value);
        break;
      case 6:
        var value = new proto.gooseai.AnswerMeta;
        reader.readMessage(value,proto.gooseai.AnswerMeta.deserializeBinaryFromReader);
        msg.setMeta(value);
        break;
      case 7:
        var value = new proto.gooseai.Artifact;
        reader.readMessage(value,proto.gooseai.Artifact.deserializeBinaryFromReader);
        msg.addArtifacts(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Answer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Answer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Answer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Answer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAnswerId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRequestId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReceived();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getCreated();
  if (f !== 0) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = message.getMeta();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.AnswerMeta.serializeBinaryToWriter
    );
  }
  f = message.getArtifactsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.gooseai.Artifact.serializeBinaryToWriter
    );
  }
};


/**
 * optional string answer_id = 1;
 * @return {string}
 */
proto.gooseai.Answer.prototype.getAnswerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setAnswerId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string request_id = 2;
 * @return {string}
 */
proto.gooseai.Answer.prototype.getRequestId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setRequestId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 received = 3;
 * @return {number}
 */
proto.gooseai.Answer.prototype.getReceived = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setReceived = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint64 created = 4;
 * @return {number}
 */
proto.gooseai.Answer.prototype.getCreated = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setCreated = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional AnswerMeta meta = 6;
 * @return {?proto.gooseai.AnswerMeta}
 */
proto.gooseai.Answer.prototype.getMeta = function() {
  return /** @type{?proto.gooseai.AnswerMeta} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.AnswerMeta, 6));
};


/**
 * @param {?proto.gooseai.AnswerMeta|undefined} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setMeta = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.clearMeta = function() {
  return this.setMeta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Answer.prototype.hasMeta = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated Artifact artifacts = 7;
 * @return {!Array<!proto.gooseai.Artifact>}
 */
proto.gooseai.Answer.prototype.getArtifactsList = function() {
  return /** @type{!Array<!proto.gooseai.Artifact>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Artifact, 7));
};


/**
 * @param {!Array<!proto.gooseai.Artifact>} value
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.setArtifactsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.gooseai.Artifact=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Artifact}
 */
proto.gooseai.Answer.prototype.addArtifacts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.gooseai.Artifact, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.Answer} returns this
 */
proto.gooseai.Answer.prototype.clearArtifactsList = function() {
  return this.setArtifactsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.AnswerBatch.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.AnswerBatch.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.AnswerBatch.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.AnswerBatch} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.AnswerBatch.toObject = function(includeInstance, msg) {
    var f, obj = {
      batchId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      answersList: jspb.Message.toObjectList(msg.getAnswersList(),
        proto.gooseai.Answer.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.AnswerBatch}
 */
proto.gooseai.AnswerBatch.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.AnswerBatch;
  return proto.gooseai.AnswerBatch.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.AnswerBatch} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.AnswerBatch}
 */
proto.gooseai.AnswerBatch.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setBatchId(value);
        break;
      case 2:
        var value = new proto.gooseai.Answer;
        reader.readMessage(value,proto.gooseai.Answer.deserializeBinaryFromReader);
        msg.addAnswers(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.AnswerBatch.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.AnswerBatch.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.AnswerBatch} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.AnswerBatch.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBatchId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAnswersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.Answer.serializeBinaryToWriter
    );
  }
};


/**
 * optional string batch_id = 1;
 * @return {string}
 */
proto.gooseai.AnswerBatch.prototype.getBatchId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.AnswerBatch} returns this
 */
proto.gooseai.AnswerBatch.prototype.setBatchId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Answer answers = 2;
 * @return {!Array<!proto.gooseai.Answer>}
 */
proto.gooseai.AnswerBatch.prototype.getAnswersList = function() {
  return /** @type{!Array<!proto.gooseai.Answer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Answer, 2));
};


/**
 * @param {!Array<!proto.gooseai.Answer>} value
 * @return {!proto.gooseai.AnswerBatch} returns this
 */
proto.gooseai.AnswerBatch.prototype.setAnswersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.Answer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Answer}
 */
proto.gooseai.AnswerBatch.prototype.addAnswers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.Answer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.AnswerBatch} returns this
 */
proto.gooseai.AnswerBatch.prototype.clearAnswersList = function() {
  return this.setAnswersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.Request.repeatedFields_ = [4];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gooseai.Request.oneofGroups_ = [[5,7,8,11,12]];

/**
 * @enum {number}
 */
proto.gooseai.Request.ParamsCase = {
  PARAMS_NOT_SET: 0,
  IMAGE: 5,
  CLASSIFIER: 7,
  ASSET: 8,
  INTERPOLATE: 11,
  TRANSFORM: 12
};

/**
 * @return {proto.gooseai.Request.ParamsCase}
 */
proto.gooseai.Request.prototype.getParamsCase = function() {
  return /** @type {proto.gooseai.Request.ParamsCase} */(jspb.Message.computeOneofCase(this, proto.gooseai.Request.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Request.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Request.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Request} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Request.toObject = function(includeInstance, msg) {
    var f, obj = {
      engineId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      requestId: jspb.Message.getFieldWithDefault(msg, 2, ""),
      requestedType: jspb.Message.getFieldWithDefault(msg, 3, 0),
      promptList: jspb.Message.toObjectList(msg.getPromptList(),
        proto.gooseai.Prompt.toObject, includeInstance),
      image: (f = msg.getImage()) && proto.gooseai.ImageParameters.toObject(includeInstance, f),
      classifier: (f = msg.getClassifier()) && proto.gooseai.ClassifierParameters.toObject(includeInstance, f),
      asset: (f = msg.getAsset()) && proto.gooseai.AssetParameters.toObject(includeInstance, f),
      interpolate: (f = msg.getInterpolate()) && proto.gooseai.InterpolateParameters.toObject(includeInstance, f),
      transform: (f = msg.getTransform()) && proto.gooseai.TransformParameters.toObject(includeInstance, f),
      conditioner: (f = msg.getConditioner()) && proto.gooseai.ConditionerParameters.toObject(includeInstance, f),
      extras: (f = msg.getExtras()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Request}
 */
proto.gooseai.Request.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Request;
  return proto.gooseai.Request.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Request} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Request}
 */
proto.gooseai.Request.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setEngineId(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setRequestId(value);
        break;
      case 3:
        var value = /** @type {!proto.gooseai.ArtifactType} */ (reader.readEnum());
        msg.setRequestedType(value);
        break;
      case 4:
        var value = new proto.gooseai.Prompt;
        reader.readMessage(value,proto.gooseai.Prompt.deserializeBinaryFromReader);
        msg.addPrompt(value);
        break;
      case 5:
        var value = new proto.gooseai.ImageParameters;
        reader.readMessage(value,proto.gooseai.ImageParameters.deserializeBinaryFromReader);
        msg.setImage(value);
        break;
      case 7:
        var value = new proto.gooseai.ClassifierParameters;
        reader.readMessage(value,proto.gooseai.ClassifierParameters.deserializeBinaryFromReader);
        msg.setClassifier(value);
        break;
      case 8:
        var value = new proto.gooseai.AssetParameters;
        reader.readMessage(value,proto.gooseai.AssetParameters.deserializeBinaryFromReader);
        msg.setAsset(value);
        break;
      case 11:
        var value = new proto.gooseai.InterpolateParameters;
        reader.readMessage(value,proto.gooseai.InterpolateParameters.deserializeBinaryFromReader);
        msg.setInterpolate(value);
        break;
      case 12:
        var value = new proto.gooseai.TransformParameters;
        reader.readMessage(value,proto.gooseai.TransformParameters.deserializeBinaryFromReader);
        msg.setTransform(value);
        break;
      case 6:
        var value = new proto.gooseai.ConditionerParameters;
        reader.readMessage(value,proto.gooseai.ConditionerParameters.deserializeBinaryFromReader);
        msg.setConditioner(value);
        break;
      case 2047:
        var value = new google_protobuf_struct_pb.Struct;
        reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
        msg.setExtras(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Request.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Request.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Request} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Request.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEngineId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRequestId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRequestedType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getPromptList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.gooseai.Prompt.serializeBinaryToWriter
    );
  }
  f = message.getImage();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gooseai.ImageParameters.serializeBinaryToWriter
    );
  }
  f = message.getClassifier();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gooseai.ClassifierParameters.serializeBinaryToWriter
    );
  }
  f = message.getAsset();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.gooseai.AssetParameters.serializeBinaryToWriter
    );
  }
  f = message.getInterpolate();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.gooseai.InterpolateParameters.serializeBinaryToWriter
    );
  }
  f = message.getTransform();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.gooseai.TransformParameters.serializeBinaryToWriter
    );
  }
  f = message.getConditioner();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gooseai.ConditionerParameters.serializeBinaryToWriter
    );
  }
  f = message.getExtras();
  if (f != null) {
    writer.writeMessage(
      2047,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
};


/**
 * optional string engine_id = 1;
 * @return {string}
 */
proto.gooseai.Request.prototype.getEngineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setEngineId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string request_id = 2;
 * @return {string}
 */
proto.gooseai.Request.prototype.getRequestId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setRequestId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ArtifactType requested_type = 3;
 * @return {!proto.gooseai.ArtifactType}
 */
proto.gooseai.Request.prototype.getRequestedType = function() {
  return /** @type {!proto.gooseai.ArtifactType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gooseai.ArtifactType} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setRequestedType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * repeated Prompt prompt = 4;
 * @return {!Array<!proto.gooseai.Prompt>}
 */
proto.gooseai.Request.prototype.getPromptList = function() {
  return /** @type{!Array<!proto.gooseai.Prompt>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Prompt, 4));
};


/**
 * @param {!Array<!proto.gooseai.Prompt>} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setPromptList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.gooseai.Prompt=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Prompt}
 */
proto.gooseai.Request.prototype.addPrompt = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.gooseai.Prompt, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearPromptList = function() {
  return this.setPromptList([]);
};


/**
 * optional ImageParameters image = 5;
 * @return {?proto.gooseai.ImageParameters}
 */
proto.gooseai.Request.prototype.getImage = function() {
  return /** @type{?proto.gooseai.ImageParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.ImageParameters, 5));
};


/**
 * @param {?proto.gooseai.ImageParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setImage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.gooseai.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearImage = function() {
  return this.setImage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasImage = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional ClassifierParameters classifier = 7;
 * @return {?proto.gooseai.ClassifierParameters}
 */
proto.gooseai.Request.prototype.getClassifier = function() {
  return /** @type{?proto.gooseai.ClassifierParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.ClassifierParameters, 7));
};


/**
 * @param {?proto.gooseai.ClassifierParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setClassifier = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.gooseai.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearClassifier = function() {
  return this.setClassifier(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasClassifier = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional AssetParameters asset = 8;
 * @return {?proto.gooseai.AssetParameters}
 */
proto.gooseai.Request.prototype.getAsset = function() {
  return /** @type{?proto.gooseai.AssetParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.AssetParameters, 8));
};


/**
 * @param {?proto.gooseai.AssetParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setAsset = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.gooseai.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearAsset = function() {
  return this.setAsset(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasAsset = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional InterpolateParameters interpolate = 11;
 * @return {?proto.gooseai.InterpolateParameters}
 */
proto.gooseai.Request.prototype.getInterpolate = function() {
  return /** @type{?proto.gooseai.InterpolateParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.InterpolateParameters, 11));
};


/**
 * @param {?proto.gooseai.InterpolateParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setInterpolate = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.gooseai.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearInterpolate = function() {
  return this.setInterpolate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasInterpolate = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional TransformParameters transform = 12;
 * @return {?proto.gooseai.TransformParameters}
 */
proto.gooseai.Request.prototype.getTransform = function() {
  return /** @type{?proto.gooseai.TransformParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.TransformParameters, 12));
};


/**
 * @param {?proto.gooseai.TransformParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setTransform = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.gooseai.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearTransform = function() {
  return this.setTransform(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasTransform = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional ConditionerParameters conditioner = 6;
 * @return {?proto.gooseai.ConditionerParameters}
 */
proto.gooseai.Request.prototype.getConditioner = function() {
  return /** @type{?proto.gooseai.ConditionerParameters} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.ConditionerParameters, 6));
};


/**
 * @param {?proto.gooseai.ConditionerParameters|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setConditioner = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearConditioner = function() {
  return this.setConditioner(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasConditioner = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.Struct extras = 2047;
 * @return {?proto.google.protobuf.Struct}
 */
proto.gooseai.Request.prototype.getExtras = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 2047));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.setExtras = function(value) {
  return jspb.Message.setWrapperField(this, 2047, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Request} returns this
 */
proto.gooseai.Request.prototype.clearExtras = function() {
  return this.setExtras(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Request.prototype.hasExtras = function() {
  return jspb.Message.getField(this, 2047) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.OnStatus.repeatedFields_ = [1,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.OnStatus.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.OnStatus.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.OnStatus} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.OnStatus.toObject = function(includeInstance, msg) {
    var f, obj = {
      reasonList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
      target: jspb.Message.getFieldWithDefault(msg, 2, ""),
      actionList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.OnStatus}
 */
proto.gooseai.OnStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.OnStatus;
  return proto.gooseai.OnStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.OnStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.OnStatus}
 */
proto.gooseai.OnStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var values = /** @type {!Array<!proto.gooseai.FinishReason>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
        for (var i = 0; i < values.length; i++) {
          msg.addReason(values[i]);
        }
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setTarget(value);
        break;
      case 3:
        var values = /** @type {!Array<!proto.gooseai.StageAction>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
        for (var i = 0; i < values.length; i++) {
          msg.addAction(values[i]);
        }
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.OnStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.OnStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.OnStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.OnStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReasonList();
  if (f.length > 0) {
    writer.writePackedEnum(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getActionList();
  if (f.length > 0) {
    writer.writePackedEnum(
      3,
      f
    );
  }
};


/**
 * repeated FinishReason reason = 1;
 * @return {!Array<!proto.gooseai.FinishReason>}
 */
proto.gooseai.OnStatus.prototype.getReasonList = function() {
  return /** @type {!Array<!proto.gooseai.FinishReason>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<!proto.gooseai.FinishReason>} value
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.setReasonList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!proto.gooseai.FinishReason} value
 * @param {number=} opt_index
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.addReason = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.clearReasonList = function() {
  return this.setReasonList([]);
};


/**
 * optional string target = 2;
 * @return {string}
 */
proto.gooseai.OnStatus.prototype.getTarget = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.setTarget = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.clearTarget = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.OnStatus.prototype.hasTarget = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated StageAction action = 3;
 * @return {!Array<!proto.gooseai.StageAction>}
 */
proto.gooseai.OnStatus.prototype.getActionList = function() {
  return /** @type {!Array<!proto.gooseai.StageAction>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<!proto.gooseai.StageAction>} value
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.setActionList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!proto.gooseai.StageAction} value
 * @param {number=} opt_index
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.addAction = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.OnStatus} returns this
 */
proto.gooseai.OnStatus.prototype.clearActionList = function() {
  return this.setActionList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.Stage.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.Stage.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.Stage.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.Stage} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.Stage.toObject = function(includeInstance, msg) {
    var f, obj = {
      id: jspb.Message.getFieldWithDefault(msg, 1, ""),
      request: (f = msg.getRequest()) && proto.gooseai.Request.toObject(includeInstance, f),
      onStatusList: jspb.Message.toObjectList(msg.getOnStatusList(),
        proto.gooseai.OnStatus.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.Stage}
 */
proto.gooseai.Stage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.Stage;
  return proto.gooseai.Stage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.Stage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.Stage}
 */
proto.gooseai.Stage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setId(value);
        break;
      case 2:
        var value = new proto.gooseai.Request;
        reader.readMessage(value,proto.gooseai.Request.deserializeBinaryFromReader);
        msg.setRequest(value);
        break;
      case 3:
        var value = new proto.gooseai.OnStatus;
        reader.readMessage(value,proto.gooseai.OnStatus.deserializeBinaryFromReader);
        msg.addOnStatus(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.Stage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.Stage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.Stage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.Stage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRequest();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gooseai.Request.serializeBinaryToWriter
    );
  }
  f = message.getOnStatusList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.gooseai.OnStatus.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.gooseai.Stage.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.Stage} returns this
 */
proto.gooseai.Stage.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Request request = 2;
 * @return {?proto.gooseai.Request}
 */
proto.gooseai.Stage.prototype.getRequest = function() {
  return /** @type{?proto.gooseai.Request} */ (
    jspb.Message.getWrapperField(this, proto.gooseai.Request, 2));
};


/**
 * @param {?proto.gooseai.Request|undefined} value
 * @return {!proto.gooseai.Stage} returns this
 */
proto.gooseai.Stage.prototype.setRequest = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gooseai.Stage} returns this
 */
proto.gooseai.Stage.prototype.clearRequest = function() {
  return this.setRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gooseai.Stage.prototype.hasRequest = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated OnStatus on_status = 3;
 * @return {!Array<!proto.gooseai.OnStatus>}
 */
proto.gooseai.Stage.prototype.getOnStatusList = function() {
  return /** @type{!Array<!proto.gooseai.OnStatus>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.OnStatus, 3));
};


/**
 * @param {!Array<!proto.gooseai.OnStatus>} value
 * @return {!proto.gooseai.Stage} returns this
 */
proto.gooseai.Stage.prototype.setOnStatusList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.gooseai.OnStatus=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.OnStatus}
 */
proto.gooseai.Stage.prototype.addOnStatus = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.gooseai.OnStatus, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.Stage} returns this
 */
proto.gooseai.Stage.prototype.clearOnStatusList = function() {
  return this.setOnStatusList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gooseai.ChainRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.gooseai.ChainRequest.prototype.toObject = function(opt_includeInstance) {
    return proto.gooseai.ChainRequest.toObject(opt_includeInstance, this);
  };


  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.gooseai.ChainRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.gooseai.ChainRequest.toObject = function(includeInstance, msg) {
    var f, obj = {
      requestId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      stageList: jspb.Message.toObjectList(msg.getStageList(),
        proto.gooseai.Stage.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gooseai.ChainRequest}
 */
proto.gooseai.ChainRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gooseai.ChainRequest;
  return proto.gooseai.ChainRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gooseai.ChainRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gooseai.ChainRequest}
 */
proto.gooseai.ChainRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setRequestId(value);
        break;
      case 2:
        var value = new proto.gooseai.Stage;
        reader.readMessage(value,proto.gooseai.Stage.deserializeBinaryFromReader);
        msg.addStage(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gooseai.ChainRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gooseai.ChainRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gooseai.ChainRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gooseai.ChainRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRequestId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStageList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gooseai.Stage.serializeBinaryToWriter
    );
  }
};


/**
 * optional string request_id = 1;
 * @return {string}
 */
proto.gooseai.ChainRequest.prototype.getRequestId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gooseai.ChainRequest} returns this
 */
proto.gooseai.ChainRequest.prototype.setRequestId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Stage stage = 2;
 * @return {!Array<!proto.gooseai.Stage>}
 */
proto.gooseai.ChainRequest.prototype.getStageList = function() {
  return /** @type{!Array<!proto.gooseai.Stage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gooseai.Stage, 2));
};


/**
 * @param {!Array<!proto.gooseai.Stage>} value
 * @return {!proto.gooseai.ChainRequest} returns this
 */
proto.gooseai.ChainRequest.prototype.setStageList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gooseai.Stage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gooseai.Stage}
 */
proto.gooseai.ChainRequest.prototype.addStage = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gooseai.Stage, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gooseai.ChainRequest} returns this
 */
proto.gooseai.ChainRequest.prototype.clearStageList = function() {
  return this.setStageList([]);
};


/**
 * @enum {number}
 */
proto.gooseai.FinishReason = {
  NULL: 0,
  LENGTH: 1,
  STOP: 2,
  ERROR: 3,
  FILTER: 4
};

/**
 * @enum {number}
 */
proto.gooseai.ArtifactType = {
  ARTIFACT_NONE: 0,
  ARTIFACT_IMAGE: 1,
  ARTIFACT_VIDEO: 2,
  ARTIFACT_TEXT: 3,
  ARTIFACT_TOKENS: 4,
  ARTIFACT_EMBEDDING: 5,
  ARTIFACT_CLASSIFICATIONS: 6,
  ARTIFACT_MASK: 7,
  ARTIFACT_LATENT: 8,
  ARTIFACT_TENSOR: 9,
  ARTIFACT_DEPTH: 10
};

/**
 * @enum {number}
 */
proto.gooseai.MaskedAreaInit = {
  MASKED_AREA_INIT_ZERO: 0,
  MASKED_AREA_INIT_RANDOM: 1,
  MASKED_AREA_INIT_ORIGINAL: 2
};

/**
 * @enum {number}
 */
proto.gooseai.WeightMethod = {
  TEXT_ENCODER: 0,
  CROSS_ATTENTION: 1
};

/**
 * @enum {number}
 */
proto.gooseai.DiffusionSampler = {
  SAMPLER_DDIM: 0,
  SAMPLER_DDPM: 1,
  SAMPLER_K_EULER: 2,
  SAMPLER_K_EULER_ANCESTRAL: 3,
  SAMPLER_K_HEUN: 4,
  SAMPLER_K_DPM_2: 5,
  SAMPLER_K_DPM_2_ANCESTRAL: 6,
  SAMPLER_K_LMS: 7,
  SAMPLER_K_DPMPP_2S_ANCESTRAL: 8,
  SAMPLER_K_DPMPP_2M: 9,
  SAMPLER_K_DPMPP_SDE: 10
};

/**
 * @enum {number}
 */
proto.gooseai.Upscaler = {
  UPSCALER_RGB: 0,
  UPSCALER_GFPGAN: 1,
  UPSCALER_ESRGAN: 2
};

/**
 * @enum {number}
 */
proto.gooseai.GuidancePreset = {
  GUIDANCE_PRESET_NONE: 0,
  GUIDANCE_PRESET_SIMPLE: 1,
  GUIDANCE_PRESET_FAST_BLUE: 2,
  GUIDANCE_PRESET_FAST_GREEN: 3,
  GUIDANCE_PRESET_SLOW: 4,
  GUIDANCE_PRESET_SLOWER: 5,
  GUIDANCE_PRESET_SLOWEST: 6
};

/**
 * @enum {number}
 */
proto.gooseai.ModelArchitecture = {
  MODEL_ARCHITECTURE_NONE: 0,
  MODEL_ARCHITECTURE_CLIP_VIT: 1,
  MODEL_ARCHITECTURE_CLIP_RESNET: 2,
  MODEL_ARCHITECTURE_LDM: 3
};

/**
 * @enum {number}
 */
proto.gooseai.T2IAdapter = {
  T2IADAPTER_NONE: 0,
  T2IADAPTER_SKETCH: 1,
  T2IADAPTER_DEPTH: 2,
  T2IADAPTER_CANNY: 3
};

/**
 * @enum {number}
 */
proto.gooseai.T2IAdapterInit = {
  T2IADAPTERINIT_IMAGE: 0,
  T2IADAPTERINIT_ADAPTER_IMAGE: 1
};

/**
 * @enum {number}
 */
proto.gooseai.Action = {
  ACTION_PASSTHROUGH: 0,
  ACTION_REGENERATE_DUPLICATE: 1,
  ACTION_REGENERATE: 2,
  ACTION_OBFUSCATE_DUPLICATE: 3,
  ACTION_OBFUSCATE: 4,
  ACTION_DISCARD: 5
};

/**
 * @enum {number}
 */
proto.gooseai.ClassifierMode = {
  CLSFR_MODE_ZEROSHOT: 0,
  CLSFR_MODE_MULTICLASS: 1
};

/**
 * @enum {number}
 */
proto.gooseai.InterpolateMode = {
  INTERPOLATE_LINEAR: 0,
  INTERPOLATE_RIFE: 1,
  INTERPOLATE_VAE_LINEAR: 2,
  INTERPOLATE_VAE_SLERP: 3,
  INTERPOLATE_FILM: 4
};

/**
 * @enum {number}
 */
proto.gooseai.BorderMode = {
  BORDER_REFLECT: 0,
  BORDER_REPLICATE: 1,
  BORDER_WRAP: 2,
  BORDER_ZERO: 3,
  BORDER_PREFILL: 4
};

/**
 * @enum {number}
 */
proto.gooseai.ColorMatchMode = {
  COLOR_MATCH_HSV: 0,
  COLOR_MATCH_LAB: 1,
  COLOR_MATCH_RGB: 2
};

/**
 * @enum {number}
 */
proto.gooseai.CameraType = {
  CAMERA_PERSPECTIVE: 0,
  CAMERA_ORTHOGRAPHIC: 1
};

/**
 * @enum {number}
 */
proto.gooseai.RenderMode = {
  RENDER_MESH: 0,
  RENDER_POINTCLOUD: 1
};

/**
 * @enum {number}
 */
proto.gooseai.AssetAction = {
  ASSET_PUT: 0,
  ASSET_GET: 1,
  ASSET_DELETE: 2
};

/**
 * @enum {number}
 */
proto.gooseai.AssetUse = {
  ASSET_USE_UNDEFINED: 0,
  ASSET_USE_INPUT: 1,
  ASSET_USE_OUTPUT: 2,
  ASSET_USE_INTERMEDIATE: 3,
  ASSET_USE_PROJECT: 4
};

/**
 * @enum {number}
 */
proto.gooseai.StageAction = {
  STAGE_ACTION_PASS: 0,
  STAGE_ACTION_DISCARD: 1,
  STAGE_ACTION_RETURN: 2
};

goog.object.extend(exports, proto.gooseai);
