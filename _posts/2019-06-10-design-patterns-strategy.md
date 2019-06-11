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

Though I use my phone only for taking calls and Google maps, I still miss it. After saying goodbyes, I was desperately browsing for <a target="_blank" href="https://www.amazon.com.au/gp/search?ie=UTF8&tag=anamica-22&linkCode=ur2&linkId=078ab941e58c5b60b4ee336ff375193a&camp=247&creative=1211&index=electronics&keywords=dual sim mobile phones">Dual Sim Mobile Phones</a><img src="//ir-au.amazon-adsystem.com/e/ir?t=anamica-22&l=ur2&o=36" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> on Amazon.

One of the key features we use in most e-commerce platforms is sorting the product list either by price or new arrivals etc... 

But from an software design and architectural perspective:

> **This sorting is a best example of Strategy Pattern**  

### Strategy Pattern - Overview:

- Defines a family of algorithms
- Encapsulates each algorithm
- Makes the algorithms interchangeable within that family.

 
Strategy lets the algorithm vary independently from clients that use it.

### UML and Case Diagram

![Strategy UML]({{site.siteurl}}assets/images/design-patterns/strategy/strategy-pattern-uml.jpg)

Participants of Strategy Pattern:


> Strategy — declares an interface common to all supported algorithms. Context uses this interface to call the algorithm defined by a ConcreteStrategy.

> ConcreteStrategy — implements the algorithm using the StrategyInterface.

> Context — is configured with a ConcreteStrategy Object; maintains a reference to a Strategy object; may define an interface that lets Strategy access its data.

Remember what I was talking above, these different sorting can be implemented as below:

- [PHP Implementation](#php-implementation)
- [Golang Implementation](#golang-implementation)
                
                
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

