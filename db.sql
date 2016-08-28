/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : mvc

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2016-08-28 20:28:59
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
  `left_real` int(11) DEFAULT NULL,
  `top_real` int(11) DEFAULT NULL,
  `rotate` int(11) DEFAULT NULL,
  `font` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `width_real` float DEFAULT NULL,
  `height_real` float DEFAULT NULL,
  `layout_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of detail_layouts
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of elements
-- ----------------------------
INSERT INTO `elements` VALUES ('0', 'text', null, '4', 'text');
INSERT INTO `elements` VALUES ('1', 'name1', 'bg1.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('2', 'name2', 'bg2.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('3', 'name3', 'bg3.jpg', '1', 'jpg');
INSERT INTO `elements` VALUES ('4', 'name4', 'bg1.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('5', 'name5', 'bg2.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('6', 'name6', 'bg3.jpg', '2', 'jpg');
INSERT INTO `elements` VALUES ('7', 'name7', 'boy.png', '3', 'png');
INSERT INTO `elements` VALUES ('8', 'name8', 'girl.png', '3', 'png');

-- ----------------------------
-- Table structure for `fonts`
-- ----------------------------
DROP TABLE IF EXISTS `fonts`;
CREATE TABLE `fonts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fonts
-- ----------------------------
INSERT INTO `fonts` VALUES ('1', 'Times New Roman', 'timesnewroman/times');
INSERT INTO `fonts` VALUES ('2', 'Arial', 'arial/arial');

-- ----------------------------
-- Table structure for `layouts`
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of layouts
-- ----------------------------

-- ----------------------------
-- Table structure for `texts`
-- ----------------------------
DROP TABLE IF EXISTS `texts`;
CREATE TABLE `texts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layout_detail_id` int(11) DEFAULT NULL,
  `content` text,
  `font_weight` varchar(255) DEFAULT NULL,
  `font_size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `font_family` varchar(255) DEFAULT NULL,
  `font_style` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `top` varchar(255) DEFAULT NULL,
  `left` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of texts
-- ----------------------------
