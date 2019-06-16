---
layout: post
title:  "Design Pattern - Strategy"
categories: [ design-pattern ]
permalink: /design-patterns/strategy-pattern
tags: [ design-pattern, strategy-design-pattern, php, golang, python, typescript ]
featured: false
comments: true
image: assets/images/design-patterns/strategy/strategy-design-pattern.jpg
---

It's been five years since I had my first Android phone, and today was the day it all changed. No I didn't get an iPhone, I broke my phone after an accidental drop. 

I'm pretty sure we all have dropped our phones at least once, but only when it falls at the right angle do we pay for our mistakes.

Though I use my phone only for taking calls and Google maps, I still miss it. After saying goodbyes, I was desperately browsing for <a target="_blank" href="https://www.amazon.com.au/gp/search?ie=UTF8&tag=anamica-22&linkCode=ur2&linkId=078ab941e58c5b60b4ee336ff375193a&camp=247&creative=1211&index=electronics&keywords=dual sim mobile phones">Dual Sim Mobile Phones</a><img src="//ir-au.amazon-adsystem.com/e/ir?t=anamica-22&l=ur2&o=36" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> on Amazon, which is when it hit me. 

One of the key features we use in most e-commerce platforms like Amazon is sorting the product list either by price or new arrivals etc... 

But from an software design and architectural perspective:

> **This sorting is a best example of Strategy Pattern**  

### Strategy Pattern - Overview:

- Defines a family of algorithms
- Encapsulates each algorithm
- Makes the algorithms interchangeable within that family.

 
Strategy lets the algorithm vary independently from clients that use it.

> A simple example is, you use your hand to draw, to write, to have food, to play cards etc... Based on the context your strategy differs, but you use the same hands

Let's see how this is translated in the program world...

### UML and Case Diagram

![Strategy UML]({{site.siteurl}}assets/images/design-patterns/strategy/strategy-pattern-uml.jpg)

Participants of Strategy Pattern:


> Strategy — declares an interface common to all supported algorithms. Context uses this interface to call the algorithm defined by a ConcreteStrategy.

> ConcreteStrategy — implements the algorithm using the StrategyInterface.

> Context — is configured with a ConcreteStrategy Object; maintains a reference to a Strategy object; may define an interface that lets Strategy access its data.

Remember what I was talking above with respect to Amazon, these different sorting can be implemented as below:

- [PHP Implementation](#php-implementation)
- [Golang Implementation](#golang-implementation)
- [Python Implementation](#python-implementation)
                
                
#### <a id="php-implementation">PHP</a>              
```php                
                <?php
                
                // This can reduce lot of type errors
                declare(strict_types=1);
                
                /**
                 * Strategy - Defines an interface common to all algorithms
                 * @param array $products
                 *
                 * @return array
                 */
                interface SorterInterface
                {
                  public function sort(array $products): array;
                }
                
                
                /**
                 * AscendingSort - Concrete Strategy - implements the algorithm using the Interface
                 */
                class AscendingSort implements SorterInterface
                {
                  public function sort(array $products): array{
                    asort($products);
                    return $products;
                  }
                }
                
                /**
                 * DescendingSort - Concrete Strategy - implements the algorithm using the Interface
                 */
                class DescendingSort implements SorterInterface
                {
                  public function sort(array $products): array{
                    arsort($products);
                    return $products;
                  }
                }
                
                /**
                 * DefaultSort - Concrete Strategy - implements the algorithm using the Interface
                 */
                class DefaultSort implements SorterInterface
                {
                  public function sort(array $products): array{
                    return $products; // return unsorted
                  }
                }
                
                /**
                 * ProductsSorter - sorts products - Context
                 */
                class ProductsSorter
                {
                  /**
                  * @var SorterInterface
                  */
                  private $sorter;
                
                  public function setSorter(SorterInterface $sorter)
                  {
                      $this->sorter = $sorter;
                  }
                
                  public function selectSortingStrategy(string $sortBy){
                    switch ($sortBy) {
                      case 'ascending':
                        $this->setSorter(new AscendingSort());
                        break;
                
                      case 'descending':
                        $this->setSorter(new DescendingSort());
                        break;
                
                      default:
                        $this->setSorter(new DefaultSort());
                        break;
                    }
                  }
                
                  public function sortProducts(array $products): array{
                      return $this->sorter->sort($products);
                  }
                }
                
                // Create Products array
                $products = array(
                  0 => 'Mobile',
                  1 => 'Camera',
                  2 => 'Flask',
                  3 => 'Coffee Mug',
                  4 => 'Laptop'
                );
                
                // This sort method will come from FrontEnd through API call
                $sortBy = 'ascending';
                $sorter = new ProductsSorter();
                
                
                $sorter->selectSortingStrategy($sortBy);
                $sortedValues = $sorter->sortProducts($products);
                
                print_r($sortedValues);
                
                $sortBy = 'descending';
                $sorter->selectSortingStrategy($sortBy);
                $sortedValues = $sorter->sortProducts($products);
                
                print_r($sortedValues);
                
```

This will produce the following result:

```
    Array
    (
        [1] => Camera
        [3] => Coffee Mug
        [2] => Flask
        [4] => Laptop
        [0] => Mobile
    )
    Array
    (
        [0] => Mobile
        [4] => Laptop
        [2] => Flask
        [3] => Coffee Mug
        [1] => Camera
    )
```

#### <a id="golang-implementation">Golang</a>

```go
    package main
    
    import (
        "encoding/json"
        "fmt"
        "sort"
    )
    
    // Product struct
    type Product struct {
        Name string
        Price int64
    }
    
    // Sorter interface
    type Sorter interface {
        Sort(products []*Product)[]*Product
    }
    
    // ByNameSorter struct
    type ByNameSorter struct {}
    
    // ByPriceSorter struct
    type ByPriceSorter struct {}
    
    
    // Sort sorts the product by By Name
    func(b ByNameSorter) Sort(products []*Product)[]*Product{
        sort.Slice(products, func(i,j int)bool{
            // Sort By Name
            return products[i].Name < products[j].Name
        })
        return products
    }
    
    // Sort sorts the product by By Price
    func(b ByPriceSorter) Sort(products []*Product)[]*Product{
        sort.Slice(products, func(i,j int)bool{
            // Sort By Price
            return products[i].Price < products[j].Price
        })
        return products
    }
    
    // SortContext struct
    type SortContext struct {}
    
    // SortBy context
    func(sc *SortContext) SortBy(products []*Product, s Sorter)[]*Product{
        return s.Sort(products)
    }
    
    // getProducts returns products array
    func getProducts()[]*Product{
        var products []*Product
    
        products = append(products, &Product{
            Name: "Mobile",
            Price: 12,
        })
    
        products = append(products, &Product{
            Name: "Camera",
            Price: 20,
        })
    
        products = append(products, &Product{
            Name: "Flask",
            Price: 5,
        })
    
        products = append(products, &Product{
            Name: "Coffee Mug",
            Price: 10,
        })
    
        products = append(products, &Product{
            Name: "Laptop",
            Price: 40,
        })
    
        return products
    }
    
    
    func prettyFormat(i interface{}) string {
        s, _ := json.MarshalIndent(i, "", "\t")
        return string(s)
    }
    
    func main(){
    
        products := getProducts()
        sCtx := &SortContext{}
    
        sortedByName := sCtx.SortBy(products, ByNameSorter{})
        sortedByPrice := sCtx.SortBy(products, ByPriceSorter{})
    
        fmt.Println(prettyFormat(sortedByName))
        fmt.Println(prettyFormat(sortedByPrice))
    
    }

```

Running this will return:

```commandline
[
           {
                   "Name": "Flask",
                   "Price": 5
           },
           {
                   "Name": "Coffee Mug",
                   "Price": 10
           },
           {
                   "Name": "Mobile",
                   "Price": 12
           },
           {
                   "Name": "Camera",
                   "Price": 20
           },
           {
                   "Name": "Laptop",
                   "Price": 40
           }
   ]
   [
           {
                   "Name": "Flask",
                   "Price": 5
           },
           {
                   "Name": "Coffee Mug",
                   "Price": 10
           },
           {
                   "Name": "Mobile",
                   "Price": 12
           },
           {
                   "Name": "Camera",
                   "Price": 20
           },
           {
                   "Name": "Laptop",
                   "Price": 40
           }
   ]
```


#### <a id="python-implementation">Python</a>

Python supports multiple inheritance, so there is no concept of interface.
Hence, in Python Strategy can be implemented in multiple ways, I showing two of them here.

The first is using Class and inheritance

```python
# Sorting Strategy
class Sort:
    def algorithm(self, sort_list): pass


# Sort by Name
class ByName(Sort):
    def algorithm(self, sort_list):
        return sorted(sort_list, key=lambda dct: dct['name'])


# Sort by Price
class ByPrice(Sort):
    def algorithm(self, sort_list):
        return sorted(sort_list, key=lambda dct: dct['price'])


# Sorter Context
class SorterContext:
    def __init__(self, strategy):
        self.strategy = strategy

    def sort(self, sort_list):
        return self.strategy.algorithm(sort_list)

    def change_algorithm(self, new_algorithm):
        self.strategy = new_algorithm


products = [
    {'name': 'Mobie', 'price': 12},
    {'name': 'Camera', 'price': 20},
    {'name': 'Flask', 'price': 5},
    {'name': 'Coffee mug', 'price': 10},
    {'name': 'Laptop', 'price': 40},
]

sorting = SorterContext(ByName())
sorted_by_name = sorting.sort(products)

print(sorted_by_name)

sorting.change_algorithm(ByPrice())
sorted_by_price = sorting.sort(products)

print(sorted_by_price)

```


The second is using function and using them as object

```python
# Sort by name
def sort_by_name(sort_list):
    return sorted(sort_list, key=lambda dct: dct['name'])


# Sort by price
def sort_by_price(sort_list):
    return sorted(sort_list, key=lambda dct: dct['price'])


products = [
    {'name': 'Mobie', 'price': 12},
    {'name': 'Camera', 'price': 20},
    {'name': 'Flask', 'price': 5},
    {'name': 'Coffee mug', 'price': 10},
    {'name': 'Laptop', 'price': 40},
]

# Choose the strategy
sort = sort_by_name

# Execute strategy
print(sort(products))


# Choose the strategy
sort = sort_by_price

# Execute strategy
print(sort(products))

```

From the second method, I hear what you are trying to say, we could simply call the function instead of assign it to variable and then calling the variable.

But the logic here is if we were to call another function which chooses the startegy based on some other criteria, and returns back the object, all we have to do is call the sort() function   

Both the method above will return the following:

```commandline
[
 {'name': 'Camera', 'price': 20}, 
 {'name': 'Coffee mug', 'price': 10},
 {'name': 'Flask', 'price': 5}, 
 {'name': 'Laptop', 'price': 40}, 
 {'name': 'Mobie', 'price': 12}
]

[
 {'name': 'Flask', 'price': 5},
 {'name': 'Coffee mug', 'price': 10},
 {'name': 'Mobie', 'price': 12},
 {'name': 'Camera', 'price': 20},
 {'name': 'Laptop', 'price': 40}
]
```

I'll be adding implementations in  Typescript for the same sorting example, here, in a while

I have added the same codes in [Github](https://github.com/Anamican/design-patterns). I'll be adding more examples for each pattern and language in their respective folders.      

To your success,

Madhu