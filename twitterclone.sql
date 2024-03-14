create database twitterclone;
use twitterclone;
create table users (
userid int primary  key auto_increment,
username varchar(50) unique not null,
passwordhash varchar(255) not null,
gender varchar(2),
mobile varchar(20),
email varchar(100),
pic varchar(1000),
profiletext varchar(2000) );

create table tweet (
twid int primary key auto_increment,
twtext varchar(2000),
userid int references users(userid),
-- userid int,
-- constraint fk_userid foreign key(userid) references users(userid),
-- foreign key(userid) references users(userid),
media varchar(1000) ,
numlikes int default 0,
numretweets int default 0,
twtime datetime ); 

-- alter table tweet add constraint 
-- fk_userid foreign key(userid) references users(userid);

create table twactivity (
activityid int primary key auto_increment,
twid int references tweet(twid),
userid int references users(userid),
activity varchar(30),
activitytime datetime );

create table follower  (
folid int primary key auto_increment,
userid int references users(userid),
followingid int references users(userid) );

INSERT INTO `twitterclone`.`users` (`userid`, `username`, `passwordhash`, `gender`, `mobile`, `profiletext`) VALUES ('101', 'abhishek', 'abhi', 'M', '9854875421', 'Student of Chitakara in Computers');
INSERT INTO `twitterclone`.`users` (`userid`, `username`, `passwordhash`, `gender`, `mobile`, `profiletext`) VALUES ('102', 'syna', 'syna', 'F', '8754659821', 'Tech Enthusiast Panchkula');
INSERT INTO `twitterclone`.`users` (`userid`, `username`, `passwordhash`, `gender`, `mobile`, `profiletext`) VALUES ('103', 'shruti', 'shruti', 'F', '5421659887', 'Love Music Dance and Computers');
INSERT INTO `twitterclone`.`users` (`userid`, `username`, `passwordhash`, `gender`, `mobile`, `profiletext`) VALUES ('104', 'satyam', 'saty', 'M', '8754323232', 'Computer Student with high ambitions');

INSERT INTO `twitterclone`.`follower` (`folid`, `userid`, `followingid`) VALUES ('101', '101', '102');
INSERT INTO `twitterclone`.`follower` (`userid`, `followingid`) VALUES ('101', '104');
INSERT INTO `twitterclone`.`follower` (`userid`, `followingid`) VALUES ('102', '101');
INSERT INTO `twitterclone`.`follower` (`userid`, `followingid`) VALUES ('102', '104');
INSERT INTO `twitterclone`.`follower` (`userid`, `followingid`) VALUES ('103', '104');


INSERT INTO `twitterclone`.`tweet` (`twid`, `twtext`, `userid`, `twtime`) VALUES ('1', 'Farmers Protest for MSP goes violent', '101', '2024-02-13 13:05:05');
INSERT INTO `twitterclone`.`tweet` (`twid`, `twtext`, `userid`, `twtime`) VALUES ('2', 'Let us vote for the progress of the country', '101', '2024-02-13 14:00:00');
INSERT INTO `twitterclone`.`tweet` (`twid`, `twtext`, `userid`, `twtime`) VALUES ('3', 'Learn technology for the benefit of the society.', '102', '2024-02-14 10:05:32');

select * from TWEET;







