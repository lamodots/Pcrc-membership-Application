const { AppSettingModel } = require("../../models");
async function appSettingsServices(body) {
  console.log("SERVUCES", body);
  try {
    const appSettings = await AppSettingModel.findOneAndUpdate({}, body, {
      upsert: true,
    });

    return appSettings;
  } catch (error) {
    throw error;
  }
}

async function getAppSettingsServices() {
  const appSettings = await AppSettingModel.find({});
  if (!appSettings) {
    throw new BadRequestError("No app settings");
  }
  return appSettings;
}
module.exports = { appSettingsServices, getAppSettingsServices };
