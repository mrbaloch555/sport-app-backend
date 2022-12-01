const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photoPath: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
/**
 * create Text string for title
 */
newsSchema.index({ title: "text" });

newsSchema.plugin(toJSON);
newsSchema.plugin(paginate);
/**
 * @typedef News
 */
const News = mongoose.model("News", newsSchema);

module.exports = News;
