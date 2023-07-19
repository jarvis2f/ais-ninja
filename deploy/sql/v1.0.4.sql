alter table ais_ninja.config
    modify name enum ('shop_introduce', 'user_introduce', 'register_reward', 'draw_use_price', 'history_message_count', 'signin_reward', 'ai3_ratio', 'ai4_ratio' ,
        'invitee_reward', 'inviter_reward') not null;

alter table ais_ninja.user
    add invite_code varchar(255) default '' not null;

alter table ais_ninja.user
    add invite_by bigint default 0 not null;

alter table ais_ninja.token
    add supplier varchar(255) default '' not null;

alter table ais_ninja.message
    add name varchar(255) default '' not null;

# Update token supplier default 'openai'
update ais_ninja.token
set token.supplier='openai'
where token.supplier = '';

# Generate invitation code
UPDATE ais_ninja.user
SET invite_code = (SELECT new_invite_code
                   FROM (SELECT SUBSTRING(MD5(RAND()), 1, 4) AS new_invite_code
                         FROM ais_ninja.user AS u
                         WHERE u.invite_code = ''
                         GROUP BY new_invite_code) AS temp
                   LIMIT 1)
WHERE invite_code = '';
