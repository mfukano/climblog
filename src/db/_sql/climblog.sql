-- create climbs table
create table if not exists climbs (
  id integer primary key not null,
  color string,
  discipline string,
  grade string,
  terrain string,
  problemHolds string,
  progress string,
  dateStarted Date,
  dateSent Date,
  numSessionsBeforeSend integer
);

-- create sessions table
create table if not exists sessions (
  id integer primary key not null,
  sessionStart string,
  duration integer,
  gym string,
  climbs string
);

drop table if exists sessions;
drop table if exists climbs;

-- create session
insert into sessions (
  sessionStart, gym, duration, climbs	
) 
values ('2024-01-01',
'Dogpatch Boulders', 3600, '[1, 2, 3, 4]')
returning *;


-- get all sessions 
select * 
from sessions;

-- get specific session
select * 
from sessions
where id = 1;

-- create climb
insert into climbs (
  color, 
  discipline, 
  grade, 
  terrain, 
  problemHolds, 
  progress, 
  dateStarted, 
  dateSent, 
  numSessionsBeforeSend 
) 
values (
  'red',				-- color: string
  'boulder',			-- discipline: string
  'V2',					-- grade: string
  '[slab]',				-- terrain: string
  '[crimp]',			-- problemHolds: string
  'sent',				-- progress: string
  '2024-01-01',			-- dateStarted: Date
  '2024-01-01', 		-- dateSent: Date
  1						-- numSessionsBeforeSend: integer
)
returning *;

insert into climbs (
  color, 
  discipline, 
  grade, 
  terrain, 
  problemHolds, 
  progress, 
  dateStarted, 
  dateSent, 
  numSessionsBeforeSend 
) 
values (
  'blue',				-- color: string
  'boulder',			-- discipline: string
  'V3',					-- grade: string
  '[overhang]'			-- terrain: string
  '[footchip]'			-- problemHolds: string
  'sent',				-- progress: string
  '2024-01-01',			-- dateStarted: Date
  '2024-01-01',			-- dateSent: Date
  1 					-- numSessionsBeforeSend: integer
)
returning *;

-- get all climbs
select * 
from climbs;

-- get specific climb
select * 
from climbs 
where id = 1;

-- update a climb
update climbs
set terrain = '[slab, arete]'
where id = 1;

-- delete from climbs where id = 1;