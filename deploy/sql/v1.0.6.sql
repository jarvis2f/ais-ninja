alter table ais_ninja.user
    add level int default 0 not null;

alter table ais_ninja.user
    add level_expire_time datetime null;

alter table config
    modify name enum ('shop_introduce', 'user_introduce', 'register_reward', 'draw_use_price', 'history_message_count', 'signin_reward', 'ai3_ratio', 'ai4_ratio', 'model_ratio', 'user_level_ratio', 'invitee_reward', 'inviter_reward', 'site_info') not null;

