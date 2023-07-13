import ApiResponse from "../../utils/response";
import utils from "../../utils";
import {User} from "../../models/User";
import {Plugin} from "../../models/Plugin";
import {sequelize} from "../../config/db";
import {Functions} from "../../models/Functions";
import {UserInstalledPlugin} from "../../models/UserInstalledPlugin";
import {Router} from "express";

const router = Router();
router.get('/plugins', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {page, page_size} = utils.paging(req.query.page, 6);
  const type = req.query.type || 'market';

  const include = [
    {
      model: User,
      as: 'creator'
    }
  ];
  if (type === 'installed') {
    include.push({
      model: User,
      as: 'installed_users',
      where: {
        id: user_id
      },
      attributes: [] // Exclude user attributes from the result
    } as any)
  }
  const plugins = await Plugin.findAndCountAll({
    where: type === 'my_plugin' ? {
      creator_id: user_id
    } : {
      status: 1
    },
    attributes: {
      include: [
        [
          sequelize!.literal(`(
            SELECT COUNT(*) FROM user_installed_plugin
            WHERE user_installed_plugin.plugin_id = Plugin.id
            AND user_installed_plugin.user_id = ${user_id}
          )`),
          'installed'
        ]
      ],
    },
    include: include,
    offset: page * page_size,
    limit: page_size
  });

  // Add 'installed' field to each plugin indicating if it's installed
  const modifiedPlugins = plugins.rows.map((plugin) => {
    const isInstalled = (plugin.get('installed') as number || 0) > 0;
    return {
      ...plugin.toJSON(),
      installed: isInstalled,
    };
  });

  res.json(ApiResponse.success({
    ...plugins,
    rows: modifiedPlugins,
  }));
})

router.get('/plugin/:id', async (req, res) => {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id, {
    include: [{
      model: User,
      as: 'creator'
    }, {
      model: Functions,
      as: 'functions'
    }
    ],
    attributes: {
      include: [
        [
          sequelize!.literal(`(
            SELECT COUNT(*) FROM user_installed_plugin
            WHERE user_installed_plugin.plugin_id = Plugin.id
            AND user_installed_plugin.user_id = ${user_id}
          )`),
          'installed'
        ]
      ],
    },
  });
  res.json(ApiResponse.success({
    ...plugin?.toJSON(),
    variables: user_id === plugin?.get('creator_id') ? JSON.parse(plugin?.get('variables') || '[]') : [],
    installed: ((plugin?.get('installed') as number || 0) > 0) as boolean,
  }));
})

router.post('/plugin/:id/release', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.getDataValue('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  await plugin.update({
    status: 1
  });
  res.json(ApiResponse.success());
})

router.post('/plugin/:id/install', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    res.json(ApiResponse.error(500, req.t('用户不存在')));
    return;
  }
  await UserInstalledPlugin.findOrCreate({
    where: {
      user_id,
      plugin_id: id
    }
  });
  res.json(ApiResponse.success());
});

router.post('/plugin/:id/uninstall', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    res.json(ApiResponse.error(500, req.t('用户不存在')));
    return;
  }
  await UserInstalledPlugin.destroy({
    where: {
      user_id,
      plugin_id: id
    }
  });
  res.json(ApiResponse.success());
})

router.post('/plugin', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {name, description, avatar} = req.body;
  if (!name || !description) {
    res.json(ApiResponse.miss());
    return;
  }
  const variables = req.body.variables?.map((variable: any) => {
    delete variable.id;
    return variable;
  });
  const plugin = await Plugin.create({
    name,
    description,
    avatar,
    creator_id: user_id,
    variables: variables ? JSON.stringify(variables) : "",
  } as Plugin);

  res.json(ApiResponse.success(plugin));
})

router.put('/plugin/:id', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.get('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  const {name, description, avatar} = req.body;
  if (!name || !description) {
    res.json(ApiResponse.miss());
    return;
  }
  const variables = req.body.variables?.map((variable: any) => {
    delete variable.id;
    return variable;
  });
  await plugin.update({
    name,
    description,
    avatar,
    variables: variables ? JSON.stringify(variables) : "",
  } as Plugin);

  res.json(ApiResponse.success(plugin));
})

router.delete('/plugin/:id', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.get('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  await plugin.destroy();
  res.json(ApiResponse.success());
})

router.post('/plugin/:id/function', async (req, res) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.get('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  const {name, description, parameters, script} = req.body;
  if (!name || !description || !parameters || !script) {
    res.json(ApiResponse.miss());
    return;
  }
  const func = await Functions.create({
    plugin_id: Number(id),
    name,
    description,
    parameters,
    script,
  } as Functions);
  res.json(ApiResponse.success(func));
})

router.put('/plugin/:id/function/:function_id', async (req, res) => {
  const user_id = req?.user_id;
  const {id, function_id} = req.params;
  if (!user_id || !id || !function_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.get('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  const func = await Functions.findByPk(function_id);
  if (!func) {
    res.json(ApiResponse.error(500, req.t('方法不存在')));
    return;
  }
  const {name, description, parameters, script} = req.body;
  if (!name || !description || !parameters || !script) {
    res.json(ApiResponse.miss());
    return;
  }
  await func.update({
    name,
    description,
    parameters,
    script,
  } as Functions);
  res.json(ApiResponse.success(func));
})

router.delete('/plugin/:id/function/:function_id', async (req, res) => {
  const user_id = req?.user_id;
  const {id, function_id} = req.params;
  if (!user_id || !id || !function_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.get('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  const func = await Functions.findByPk(function_id);
  if (!func) {
    res.json(ApiResponse.error(500, req.t('方法不存在')));
    return;
  }
  await func.destroy();
  res.json(ApiResponse.success());
})

export default router;
