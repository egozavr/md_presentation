# Test slide 2

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

## Getting Started

To get you started you can simply clone the `angular-seed` repository and install the dependencies:

### Prerequisites

You need git to clone the `angular-seed` repository. You can get git from [here][git].

[git]: https://git-scm.com/