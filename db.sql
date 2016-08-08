/*
Navicat MySQL Data Transfer

Source Server         : moodlelocalhost
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : mvc

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2016-08-08 13:47:46
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
-- Table structure for `detail_layouts`
-- ----------------------------
DROP TABLE IF EXISTS `detail_layouts`;
CREATE TABLE `detail_layouts` (
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
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `layout_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of detail_layouts
-- ----------------------------
INSERT INTO `detail_layouts` VALUES ('25', '1', '0', '0', '0', null, null, null, null, null, '784', '287.082', '16');
INSERT INTO `detail_layouts` VALUES ('26', '2', '0', '140', '38', null, null, null, null, null, '784', '291.694', '16');
INSERT INTO `detail_layouts` VALUES ('27', '3', '0', '-84', '162', null, null, null, null, null, '784', '291.694', '16');
INSERT INTO `detail_layouts` VALUES ('28', '2', '0', '108', '140', null, null, null, null, null, '784', '291.694', '17');
INSERT INTO `detail_layouts` VALUES ('29', '1', '0', '-88', '-135', null, null, null, null, null, '784', '291.694', '17');
INSERT INTO `detail_layouts` VALUES ('30', '3', '0', '-149', '57', null, null, null, null, null, '784', '291.694', '17');
INSERT INTO `detail_layouts` VALUES ('31', '2', '0', '-10', '186', null, null, null, null, null, '784', '291.694', '18');
INSERT INTO `detail_layouts` VALUES ('32', '3', '0', '127', '164', null, null, null, null, null, '784', '291.694', '18');
INSERT INTO `detail_layouts` VALUES ('33', '1', '0', '-140', '-12', null, null, null, null, null, '784', '291.694', '18');
INSERT INTO `detail_layouts` VALUES ('34', '3', '0', '250', '1', null, null, null, null, null, '784', '291.694', '19');
INSERT INTO `detail_layouts` VALUES ('35', '1', '0', '0', '0', null, null, null, null, null, '784', '287.082', '20');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of elements
-- ----------------------------
INSERT INTO `elements` VALUES ('1', 'name1', 'bg1.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('2', 'name2', 'bg2.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('3', 'name3', 'bg3.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('4', 'name4', 'bg1.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('5', 'name5', 'bg2.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('6', 'name6', 'bg3.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('7', 'name7', 'boy.png', '3', 'png');
INSERT INTO `elements` VALUES ('8', 'name8', 'girl.png', '3', 'png');

-- ----------------------------
-- Table structure for `layouts`
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of layouts
-- ----------------------------
INSERT INTO `layouts` VALUES ('1', 'th', null);
INSERT INTO `layouts` VALUES ('2', 'th', null);
INSERT INTO `layouts` VALUES ('3', 'th', null);
INSERT INTO `layouts` VALUES ('4', 'th', null);
INSERT INTO `layouts` VALUES ('5', 'th', null);
INSERT INTO `layouts` VALUES ('6', 'th', null);
INSERT INTO `layouts` VALUES ('7', 'th', null);
INSERT INTO `layouts` VALUES ('8', 'th', null);
INSERT INTO `layouts` VALUES ('9', 'th', null);
INSERT INTO `layouts` VALUES ('10', 'th', null);
INSERT INTO `layouts` VALUES ('11', 'th', null);
INSERT INTO `layouts` VALUES ('12', 'th', null);
INSERT INTO `layouts` VALUES ('13', 'th', null);
INSERT INTO `layouts` VALUES ('14', 'th', null);
INSERT INTO `layouts` VALUES ('15', 'th', null);
INSERT INTO `layouts` VALUES ('16', 'th', null);
INSERT INTO `layouts` VALUES ('17', 'th', null);
INSERT INTO `layouts` VALUES ('18', 'th', null);
INSERT INTO `layouts` VALUES ('19', 'th', null);
INSERT INTO `layouts` VALUES ('20', 'th', null);
