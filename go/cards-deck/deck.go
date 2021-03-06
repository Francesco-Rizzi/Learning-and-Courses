package main

import (
	"fmt"
	"strconv"
	"log"
	"strings"
	"io/ioutil"
	"os"
	"math/rand"
	"time"
)

// Create a new type of deck, which is a slice of strings
type deck []string

// receiver function (every type 'deck' can now access this function as a method)
func (d deck) print() {
	for i, card := range d {
		fmt.Println(strconv.Itoa(i+1) + " -> " + card)
	}
}

func (d deck) shuffle() {

	// create and initialize a random generator with current timestamp
	randomSeed := rand.NewSource(time.Now().UnixNano())
	randomObj := rand.New(randomSeed)

	for i := range d {
		r := randomObj.Intn(len(d) - 1)
		// swap elements
		d[i], d[r] = d[r], d[i]
	}
}

func (d deck) saveToFile(fileName string) error {
	return ioutil.WriteFile(fileName, []byte(d.toString()), 0666)
}

func (d deck) toString() string {
	return strings.Join([]string(d), ",")
}

func deal(d deck, handSize int) (deck, deck) {
	if len(d) < handSize {
		log.Fatal("Invalid hand size (> of deck size).")
	}
	return d[:handSize], d[handSize:]
}

func newDeck() deck {

	cards := deck{}

	cardSuits := []string{"Clubs", "Spades", "Hearts", "Diamonds"}
	cardValues := []string{"Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"}

	// '_' tells go that that variable is not in use
	for _, suit := range cardSuits {
		for _, value := range cardValues {
			//append returns a new Slice instead of modifying the existing one
			cards = append(cards, value+" of "+suit)
		}
	}

	return cards

}

func newDeckFromFile(fileName string) deck {
	byteSlice, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
	return deck(strings.Split(string(byteSlice), ","))
}
