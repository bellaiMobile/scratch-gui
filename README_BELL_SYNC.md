### 同LLK/scratch-gui仓库保持同步

1. 首先保证本地有一个我们自己开发主分支的clone(同llk/scratch-gui一样, 我们也使用develop branch作为主分支):

```shell
git clone https://github.com/bellaiMobile/scratch-gui.git
```

2. `cd`进入本地克隆目录，执行:

```shell
git remote -v
```

3. 此时可以看到，只包含我们自己仓库的分支，所以我们添加远程源:

```shell
git remote add scratch-gui https://github.com/llk/scratch-gui.git
git remote -v
```

4. 拉取llk/scratch-gui下代码更新，此时可以查看所有源所有分支：

```shell
git fetch scratch-gui
git branch -av
```

5. 合并llk/scratch-gui下develop分支修改到origin/scratch-gui下develop分支:

```shell
git checkout develop
git merge scratch-gui/develop
git push -u origin develop
```

6. 此时合并已经成功了，远程develop分支保持了和llk/scratch-gui下develop分支同步

### 第一次之后的更新直接从4从后执行即可

```shell
git fetch scratch-gui
git merge scratch-gui/develop
git push -u origin develop
```
