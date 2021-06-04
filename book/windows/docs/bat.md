
# bat脚本调用

在一个A.bat脚本中调用另一个B.bat脚本  

> 如果不使用call，那么B.bat脚本执行完之后，当前(A.bat)脚本也不会继续往下执行。  
>   

```bat
call B.bat
```

# 延迟变量

`setlocal enabledelayedexpandsion` 延迟变量  

> "!" 是使用引用，如果开启了延迟变量，要使用引用才能正确使用变量，否则使用的将是旧的变量值。  
>   

```bat
setlocal enabledelayedexpandsion
for /f "name=*" %%j in (%file%) do (
        set tmp=%%j
        set tempname=!tmp:~0,8!
        if "!tempname!" == "dingfang" (
            echo !lastName! "!name!" >> temp.txt
            echo !tmp!
        )
)
```
