
--
-- 数据库: `bbter`
--

-- --------------------------------------------------------

--
-- 表的结构 `departments`
--

CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `departments`
--

INSERT INTO `departments` (`id`, `name`, `note`) VALUES
(1, '技术部', '123123213'),
(2, '策划推广部', '123'),
(3, '人力资源部', ''),
(4, '综合新闻部', '简直艰难'),
(5, '视觉设计部', ''),
(6, '外联部', ''),
(7, '编辑部', ''),
(8, '节目部', ''),
(9, '综合管理部', ''),
(10, '视频部', ''),
(11, '啦啦啦', '你咬我啊 （就咬你');

-- --------------------------------------------------------

--
-- 表的结构 `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, '干事'),
(2, '主管'),
(3, '部长'),
(4, '常委'),
(5, '超级管理员');

-- --------------------------------------------------------

--
-- 表的结构 `recycles`
--

CREATE TABLE IF NOT EXISTS `recycles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=133 ;

--
-- 转存表中的数据 `recycles`
--

INSERT INTO `recycles` (`id`, `user_id`, `time`) VALUES
(4, 73, '2015-11-06 13:49:41');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_number` varchar(12) NOT NULL,
  `password` char(32) NOT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `short_mobile` varchar(11) DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `college` varchar(40) DEFAULT NULL,
  `dormitory` varchar(10) DEFAULT NULL,
  `room` varchar(10) DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `completed` int(11) NOT NULL DEFAULT '0',
  `sex` enum('MALE','FEMALE','UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
  `status` enum('NORMAL','RETIRED','LEFT') NOT NULL DEFAULT 'NORMAL',
  `avotar_id` int(11) DEFAULT NULL,
  `logout` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_number` (`student_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=103 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `student_number`, `password`, `mobile`, `short_mobile`, `name`, `email`, `college`, `dormitory`, `room`, `group_id`, `department_id`, `completed`, `sex`, `status`, `avotar_id`, `logout`) VALUES
(2, '123', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 3, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(3, '201330550320', 'e10adc3949ba59abbe56e057f20f883e', '18819451560', '531560', 'cheese', 'jiarunhong@gmail.com', '材料科学与工程学院', 'C12', '626', 5, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(24, '', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 3, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(35, '20132030', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 2, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(44, '200000000001', 'e10adc3949ba59abbe56e057f20f883e', 'wrwe', 'werwe', 'fdfsd', 'rwe@qq.com', '材料科学与工程学院', 'C10', '344', 1, 1, 1, 'FEMALE', 'NORMAL', NULL, 0),
(45, '200000000002', 'e10adc3949ba59abbe56e057f20f883e', '124234', '2342', 'sdf', '3432@qq.com', '电子与信息学院', 'C10', '342', 2, 2, 1, 'MALE', 'NORMAL', NULL, 0),
(46, '200000000003', 'e10adc3949ba59abbe56e057f20f883e', 'dsf', 'sdf', 'sdf', 'dsf@q.com', '材料科学与工程学院', 'C343', '45', 4, 3, 1, 'FEMALE', 'NORMAL', NULL, 0),
(47, '200000000004', 'e10adc3949ba59abbe56e057f20f883e', '13654199887', '123456', '&amp;amp;lt;script&amp;amp;gt;', '791863347@qq.com', '公共管理学院', 'C8', '123', 4, 4, 1, 'MALE', 'NORMAL', NULL, 0),
(48, '200000000005', 'e10adc3949ba59abbe56e057f20f883e', '15814033158', '123456', '123', '791863327@qq.com', '电力学院', 'C12', '212', 3, 5, 1, 'MALE', 'NORMAL', NULL, 0),
(49, '200000000006', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 4, 6, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(50, '200000000007', 'e10adc3949ba59abbe56e057f20f883e', '15814011111', '123456', '112', '711863347@qq.com', '材料科学与工程学院', 'C12', '232', 2, 7, 1, 'MALE', 'NORMAL', NULL, 0),
(51, '200000000008', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 4, 8, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(53, '200000000010', 'e10adc3949ba59abbe56e057f20f883e', '18826456227', '666227', 'sdf', 'fmstephen1028@gmail.com', '电子与信息学院', 'c8', '188', 4, 10, 1, 'MALE', 'NORMAL', NULL, 0),
(54, '201330860108', '7d65e0cfa1281b74d62537cd947aaf02', '18819472508', '622508', '古伊虹', 'nebula_gu@100steps.net', '设计学院', 'C8东', '355', 5, 1, 1, 'FEMALE', 'NORMAL', NULL, 0),
(55, '201461551289', 'e10adc3949ba59abbe56e057f20f883e', '18813298638', '661919', 'RSS', 'ruansongsong@gmail.com', '计算机科学与工程学院', 'C12', '313', 4, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(56, '201536611351', 'e10adc3949ba59abbe56e057f20f883e', '15867703298', '123456', '戴志港', '240936337@qq.com', '软件学院', 'C10', '439', 1, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(58, '201330861111', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 2, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(62, '201330861115', 'e10adc3949ba59abbe56e057f20f883e', '18826456227', '777888', 'dms', 'sdf@gmail.co', '电子与信息学院', 'c6', '111', 4, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(65, '201612341234', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 2, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(73, '201111111113', '320e918bc3991c8438b208977e06205e', NULL, NULL, '', NULL, NULL, NULL, NULL, 3, 3, 0, 'UNKNOWN', 'RETIRED', NULL, 0),
(78, '204534534534', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 1, 3, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(85, '201111111122', 'c5a58ec2e4f5813eef41579ccf8a7e46', '18826456227', '666227', '好麻烦', '376966939@qq.com', '电子与信息学院', 'c8', '133', 1, 10, 1, 'MALE', 'NORMAL', NULL, 0),
(86, '201530542309', '10436dbf740f3230ba9884d23e60db1f', '15814033112', '123456', '姚填佳', '791863347@qq.com', '计算机科学与工程学院', 'C12', '232', 1, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(87, '201330000000', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '', NULL, NULL, NULL, NULL, 1, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(89, '201430612034', 'b454532bd7d9337d242a6ce5ece84ac2', '18826075949', '661919', '李永骥', '1425569592@qq.com', '软件学院', 'C10', '634', 5, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(90, '201330650129', '476e88302733a2b7bf3df54604d2cf4f', '18826456227', '666227', '傅镝文', '376966939@gmail.com', '经济与贸易学院', 'c9', '388', 5, 1, 1, 'MALE', 'NORMAL', NULL, 0),
(91, '201330869999', '395e729656bf43b608203ea6d770aaca', NULL, NULL, '', NULL, NULL, NULL, NULL, 1, 1, 0, 'UNKNOWN', 'NORMAL', NULL, 0),
(101, '201330444444', '40e07c856bb4660ac6d9d02612346f18', '18826456227', '666777', 'lt ', '23232@gmail', '机械与汽车工程学院', 'c11', '323', 4, 1, 1, 'MALE', 'NORMAL', NULL, 0);


