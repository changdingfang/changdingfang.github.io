" ======================================================================
"  FileName:     file_title.vim
"  Author:       dingfang
"  CreateDate:   2020-09-12 14:22:35
"  ModifyAuthor: dingfang
"  ModifyDate:   2020-12-16 19:59:50
" ======================================================================

if exists("g:loaded_file_title")
    finish
endif
let g:loaded_file_title = 1


" * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * 配置 * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * *

" 自定义Author, 默认Author = $USER  (USER可在命令行 echo $USER 打印获取)
" let g:file_title_author = 'dingfang'

" 保存(:w)时更新修改者信息和修改时间(ModifyAuthor 和 ModifyDate)
" 1: 开启, 0: 关闭, 默认开启
let g:file_title_modify_title = 1

" title的时间格式(CreateDate 和 ModifyDate), 默认'%Y-%m-%d %H:%M:%S'
" let g:file_title_time_format = '%Y-%m-%d %H:%M:%S'



" * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * 配置检查 * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * *

" 使用正则添加需要设置文件头的文件
let s:FileType = '*.pl,
            \*.sh,
            \*.py,
            \*.cpp,*.cc,*.cxx,
            \*.[ch],*.hh,*.tcc,*.inl,*.hpp,
            \*.vim,.vimrc'

execute 'autocmd BufNewFile ' . s:FileType . ' exec ":call SetTitle()"'


if !exists('g:file_title_modify_title') || g:file_title_modify_title == 1
    " 该时间为了防止短时间内多次保存，导致回退困难
    let s:lastModifyTime = 0
    " 修改检测时间间隔(s)
    let s:ModifyInterval = 60
    " 文件更新时,更新修改者和修改时间
    execute 'autocmd BufWrite ' . s:FileType . ' exec ":call ModifyTitle()"'
endif


" Author
let s:author = $USER
if exists('g:file_title_author')
    let s:author = g:file_title_author
endif

" time format
let s:timeFormat = '%Y-%m-%d %H:%M:%S'
if exists('g:file_title_time_format')
    let s:timeFormat = g:file_title_time_format
endif



" * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * 具体逻辑 * * * * * * * *
" * * * * * * * * * * * * * * * * * * *
" * * * * * * * * * * * * * * * * * *

let s:fn = expand("%")
let s:ft = ""
if s:fn != ""
    let s:ft = split(s:fn, '\.')[-1]
endif

" 添加对应的文件头内容
func SetTitle()
    let l:ft = s:ft
    let l:num = []

    if l:ft == "sh"
        call setline(len(add(l:num, 0)), "\#!/bin/bash")
        call SetTitle_common(len(l:num), "\#")
    elseif l:ft == 'cpp' || l:ft == 'h' 
                \ || l:ft == 'cc' || l:ft == 'hpp'
                \ || l:ft == 'cxx' 
                \ || l:ft == 'hh' || l:ft == 'tcc' || l:ft == 'inl'
                \ || l:ft == 'c' 
        let l:sline = SetTitle_common(len(l:num), "\/\/") - 1
        if l:ft == 'cpp' || l:ft == 'cc' || l:ft == 'cxx'
            call SetTitle_cxx(l:sline)
        elseif l:ft == 'c'
            call SetTitle_c(l:sline)
        elseif l:ft == 'h' || l:ft == 'hpp' 
                    \|| l:ft == 'hh' || l:ft == 'inl' || l:ft == 'tcc'
            call SetTitle_h(l:sline)
        endif
    elseif l:ft == 'py'
        call setline(len(add(l:num, 0)), "\#!/usr/bin/python")
        call setline(len(add(l:num, 0)), "\# -*- coding:utf-8 -*-")
        call SetTitle_common(len(l:num), "\#")
    elseif l:ft == 'pl'
        call setline(len(add(l:num, 0)), "\#!/usr/bin/perl")
        call SetTitle_common(len(l:num), "\#")
    elseif l:ft == 'vim' || l:ft == 'vimrc'
        call SetTitle_common(len(l:num), "\"")
    else
        call setline(1, "not found file type, please open ~/.vimrc file settings")
    endif
endfunc


func SetTitle_common(sline, cm)
    let l:num = []

    call setline(a:sline + len(add(l:num, 0)), a:cm . " =======================================================================")
    call setline(a:sline + len(add(l:num, 0)), a:cm . "  FileName:     " . s:fn)
    call setline(a:sline + len(add(l:num, 0)), a:cm . "  Author:       " . s:author)
    call setline(a:sline + len(add(l:num, 0)), a:cm . "  CreateDate:   " . strftime(s:timeFormat))
    call setline(a:sline + len(add(l:num, 0)), a:cm . "  ModifyAuthor: ")
    call setline(a:sline + len(add(l:num, 0)), a:cm . "  ModifyDate:   " . strftime(s:timeFormat))
    call setline(a:sline + len(add(l:num, 0)), a:cm .  " =======================================================================")
    call setline(a:sline + len(add(l:num, 0)), "")
    return len(l:num)
endfunc


func ModifyTitle()
    " 检查是否有修改
    let l:tableCount = 0

    " 704版本不支持getbufinfo方法
    " 802版本以上支持getbufinfo方法
    if v:version >= 802
        let l:bufs = getbufinfo({'buflisted': 1})
        for buf in l:bufs
            if buf.changed == 1
                break
                " return 0
            endif
            let l:tableCount += 1
        endfor

        if tableCount == len(l:bufs)
            return 0
        endif
    endif

    " 更新频率
    let l:lastTime = strftime("%s")
    if l:lastTime - s:lastModifyTime < s:ModifyInterval
        return 0
    endif


    let s:lastModifyTime = l:lastTime

    " 如果有多个标签，使用 :wqa 只会对当前窗口标签进行修改,这里有修改空间
    " 不过 :wqa 极少使用的
    for l:line_num in range(4, 10 ,1)
        let l:ma_line = split(getline(l:line_num), '')
        let l:md_line = split(getline(l:line_num + 1), '')
        if len(l:ma_line) < 2 || len(l:md_line) < 2
            continue
        endif

        if l:ma_line[1] == 'ModifyAuthor:' && l:md_line[1] == 'ModifyDate:'
            let l:new_ma = ma_line[0] . '  ' . ma_line[1] . ' ' . s:author
            let l:new_md = md_line[0] . '  ' . md_line[1] . '   ' . strftime(s:timeFormat)
            if len(l:ma_line) < 3 || len(l:ma_line) >= 3 && l:ma_line[2] != s:author
                call setline(l:line_num, l:new_ma)
            endif
            call setline(l:line_num + 1, l:new_md)
            break
        endif
    endfor
endfunc


func SetTitle_cxx(sline)
    let l:num = []

    call setline(a:sline + len(add(l:num, 0)), '')
    call setline(a:sline + len(add(l:num, 0)), '#include <iostream>')
    call setline(a:sline + len(add(l:num, 0)), '#include <string>')
    call setline(a:sline + len(add(l:num, 0)), '')
    call setline(a:sline + len(add(l:num, 0)), 'using namespace std;')
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), 'int main(void)')
    call setline(a:sline + len(add(l:num, 0)), '{')
    call setline(a:sline + len(add(l:num, 0)), '')
    call setline(a:sline + len(add(l:num, 0)), '    return 0;')
    call setline(a:sline + len(add(l:num, 0)), '}')
endfunc


func SetTitle_c(sline)
    let l:num = []

    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "#include <stdio.h>")
    call setline(a:sline + len(add(l:num, 0)), "#include <stdlib.h>")
    call setline(a:sline + len(add(l:num, 0)), "#include <string.h>")
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "int main(void)")
    call setline(a:sline + len(add(l:num, 0)), "{")
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "    return 0;")
    call setline(a:sline + len(add(l:num, 0)), "}")
endfunc


func SetTitle_h(sline)
    let l:filename = split(s:fn, '\zs')
    let l:Macro = '__'
    let l:isFirst = 1

    for l:ch in l:filename
        if l:ch =~ '[a-z]'
            let l:ch = toupper(l:ch)
        elseif l:ch =~ '[A-Z]' && l:isFirst != 1
            let l:Macro = l:Macro . '_'
        elseif l:ch == '.'
            let l:Macro = l:Macro . '_'
            continue
        endif
        let l:isFirst = 0
        let l:Macro = l:Macro . l:ch
    endfor

    let l:Macro = l:Macro . '__'
    let l:num = []

    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "\#ifndef " . l:Macro)
    call setline(a:sline + len(add(l:num, 0)), "\#define " . l:Macro)
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "")
    call setline(a:sline + len(add(l:num, 0)), "\#endif /* " . l:Macro . " */")
endfunc
