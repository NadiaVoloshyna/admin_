# Ukrainian-admin

## Опис
Ukrainian admin є сайтом в якому запрошені люди будуть мати змогу створювати контент для сайту Ukrainian.

## Як працювати з гітом
### Гіт команди

**git pull** - стягнути зміни з ремоут бренчі  
**git add .** - додати усі зміни в репозиторії до git index (щоб гіт знав про ці зміни)  
**git commit -m "[message]"** - створити коміт  
**git stash** - додати зміни до локального сховища  
**git stash pop** - витягнути з локального сховища те що було додано останнім  
**git branch** - побачити усі локальні бренчі  
**git checkout [name of the branch]** - переключитись на інакшу бренчу  
**git checkout -b [name of the branch]** - створити нову бренчу  
**git push** - залити зміни в ремоут бренчу  

## Якщо потпібно залити нові зміни в існуючий ремоут бренч
* git add .
* git commit -m "[message]"
* git push

## Якщо є зміни але потрібно їх залити в інакший існуючий бренч
* git add .
* git stash
* git checkout [name of the branch]
* git stash pop
* git commit -m "[message]"
* git push

## Якщо є зміни але потрібно їх залити в інакший неіснуючий бренч (тобто потрібно створити новий бренч і залити в ноього зміни)
* git add .
* git stash
* git checkout -b [name of the branch]
* git stash pop
* git commit -m "[message]"
* git push -u origin [name of the branch]
