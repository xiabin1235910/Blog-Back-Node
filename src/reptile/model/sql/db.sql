use estate;

create table if not exists district(
  id int(11) not null auto_increment,
  name varchar(200) not null,
  primary key (id)
) engine=InnoDB

