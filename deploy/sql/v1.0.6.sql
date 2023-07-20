alter table ais_ninja.user
    add level int default 0 not null;

alter table ais_ninja.user
    add level_expire_time datetime null;

alter table ais_ninja.config
    modify name enum ('shop_introduce', 'user_introduce', 'register_reward', 'draw_use_price', 'history_message_count', 'signin_reward', 'ai3_ratio', 'ai4_ratio', 'model_ratio', 'user_level_ratio', 'invitee_reward', 'inviter_reward', 'site_info') not null;

alter table ais_ninja.user_api_key_usage
    modify response longtext null;
alter table ais_ninja.user_api_key_usage
    modify request longtext null;

# 外键报错的,删除 user_api_key_usage 表的user_id 和 api_key_id外键
# SHOW CREATE TABLE ais_ninja.user_api_key_usage;
# ALTER TABLE ais_ninja.user_api_key_usage DROP FOREIGN KEY '改成上面查询的外键名称';
