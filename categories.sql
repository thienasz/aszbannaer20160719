/*
Navicat MySQL Data Transfer

Source Server         : moodlelocal
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : mvc

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2016-08-05 08:44:00
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'Layout');
INSERT INTO `categories` VALUES ('2', 'Backgroud');
INSERT INTO `categories` VALUES ('3', 'Element');
INSERT INTO `categories` VALUES ('4', 'Text');

-- ----------------------------
-- Table structure for `elements`
-- ----------------------------
DROP TABLE IF EXISTS `elements`;
CREATE TABLE `elements` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of elements
-- ----------------------------
INSERT INTO `elements` VALUES ('1', 'name1', 'bg1.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('2', 'name2', 'bg2.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('3', 'name3', 'bg3.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('4', 'name4', 'bg1.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('5', 'name5', 'bg2.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('6', 'name6', 'bg3.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('7', 'name7', 'el1.jpg', '3', 'jpg');

-- ----------------------------
-- Table structure for `layouts`
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `element_id` bigint(10) NOT NULL,
  `zindex` int(11) DEFAULT NULL,
  `top` int(11) DEFAULT NULL,
  `left` int(11) DEFAULT NULL,
  `rotate` int(11) DEFAULT NULL,
  `font` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `hieght` int(11) DEFAULT NULL,
  `layout_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of layouts
-- ----------------------------
INSERT INTO `layouts` VALUES ('1', '1', '0', '3', '328', null, null, null, null, null, '576', '211', '1');
INSERT INTO `layouts` VALUES ('2', '2', '0', '-78', '-37', null, null, null, null, null, '576', '211', '1');
INSERT INTO `layouts` VALUES ('3', '3', '0', '165', '-51', null, null, null, null, null, '576', null, '1');
