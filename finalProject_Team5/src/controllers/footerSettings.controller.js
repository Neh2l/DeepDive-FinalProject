const FooterSettings = require("../models/footerSettings.model");

const getFooterSettings = async (req, res) => {
  try {
    let settings = await FooterSettings.findOne();

    if (!settings) {
      settings = await FooterSettings.create({});
    }

    res.status(200).json({
      status: "success",
      data: settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to get footer settings",
    });
  }
};

const updateFooterSettings = async (req, res) => {
  try {
    let settings = await FooterSettings.findOne();

    if (!settings) {
      settings = await FooterSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json({
      status: "success",
      message: "Footer settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to update footer settings",
    });
  }
};

module.exports = {
  getFooterSettings,
  updateFooterSettings,
};