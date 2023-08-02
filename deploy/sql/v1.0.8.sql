# 后台公告无法保存图片
alter table config
    modify value longtext not null;
