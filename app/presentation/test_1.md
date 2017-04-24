# Test slide 1

###Test table rendering
\# | name | description
---:| :--- | :---
1  | rb061019 | Curent RB account
2  | rbx001365 | Old outstuffer account

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

---

This project is an application skeleton for a typical [AngularJS][angularjs] web app. You can use it
to quickly bootstrap your angular webapp projects and dev environment for these projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant web development gratification.

The seed app doesn't do much, just shows how to wire two controllers and views together.


[angularjs]: https://angularjs.org/
