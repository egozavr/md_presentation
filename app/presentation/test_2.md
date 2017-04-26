# Test slide 2

---

###Code block
```javascript
function sayHi(name) {
  // LexicalEnvironment = { name: 'Вася', phrase: undefined }
  var phrase = "Привет, " + name;

  // LexicalEnvironment = { name: 'Вася', phrase: 'Привет, Вася'}
  alert( phrase );
}

sayHi('Вася');
```

###Code block without lang
```
console.log(foo);

```

###Code block without HL
```nohighlight
console.log(foo);

```
