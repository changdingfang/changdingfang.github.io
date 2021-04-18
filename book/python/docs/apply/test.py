#!/usr/bin/python
# -*- coding:utf-8 -*-
# =======================================================================
#  FileName:     test.py
#  Author:       dingfang
#  CreateDate:   2021-03-14 16:37:59
#  ModifyAuthor: dingfang
#  ModifyDate:   2021-03-14 17:14:18
# =======================================================================

import struct

i1 = 1
i2 = 2
l1 = 1
f1 = 1.23456
s1 = "hello world"

# s在使用时, 1个s对应一个字符, 一个字符串, 要取其长度个s进行封包(解包的时候也是如此)  
buf = struct.pack("iilf11s", i1, i2, l1, f1, s1)

print("buf len: {}".format(len(buf)))
# 打印16进制
print("buf: {}".format(repr(buf)))
# 解包
print("unpack:{}".format(struct.unpack("iilf11s", buf)))

# char类型需要单个字符取出 
c1 = 'c1c1'
buf2 = struct.pack('4c', c1[0], c1[1], c1[2], c1[3])
print('buf2 len: {}'.format(len(buf2)))
