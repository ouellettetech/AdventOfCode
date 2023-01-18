#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stack>
#include <climits>
#include <string.h>
#include <sstream>
#include <queue>

using namespace std;

// strTok is not threadsafe so looked up another split function.
vector<std::string> strSplit(std::string original_string, char deliminator){
        std::stringstream original_stream(original_string);
        std::string segment;
        std::vector<std::string> seglist;

        while(std::getline(original_stream, segment, deliminator))
        {
                seglist.push_back(segment);
        }
        return seglist;
}

class Node{
        public:
                Node* next;
                Node* prev;
                int value;
};

class CircularList{
        public:
                CircularList(){
                        size=0;
                };
                Node* getElementFromHead(int numberOfSpaces){
                        return getElementFrom(head,numberOfSpaces);
                }
                Node* getElementFrom(Node* startNode, long long int numberOfSpaces){
                        int moduleNumber = ((numberOfSpaces+size)%(size));
                        // if(moduleNumber!=numberOfSpaces){
                        //         cout<<"Module Number! Number: "<<numberOfSpaces<<" Module: "<<moduleNumber<<" Size: "<<size<<endl;
                        // }
                        //cout<<"Module Number: "<<moduleNumber<<endl;
                        Node* current = startNode;
                        for(int i=0;i<numberOfSpaces;i++){ //Making sure we don't loop and simplifying to one direction.
                        //would be faster to go backwards if its closer in that direction. 
                                current=current->next;
                        }
                        return current;
                }
                void moveOneElement(Node* nodeToMove, long long int distance){
                        long long int moduleNumber = (distance%(size-1));
                        if(moduleNumber<0){
                                moduleNumber = moduleNumber+ size - 1;
                        }
                        Node* newLocation=getElementFrom(nodeToMove,moduleNumber);
                        if(newLocation==nodeToMove){
                                return; // don't do anything if its moving 0.
                        }
                        //cout<<"New Location: "<<newLocation->value<<endl;
                        if(head == nodeToMove){
                                head = head->next;
                        }
                        nodeToMove->prev->next = nodeToMove->next; // remove nodeToMove from list
                        nodeToMove->next->prev = nodeToMove->prev;

                        nodeToMove->prev = newLocation; // Set node to move after new location
                        nodeToMove->next = newLocation->next; // Set new locations previous next time after node to move
                        newLocation->next = nodeToMove; // set new location to point to node to move.
                        nodeToMove->next->prev = nodeToMove; //set the prev on the element after node to move.
                }
                void add(Node* element){
                        if(size == 0){
                                head = element;
                                head->next = head;
                                head->prev = head;
                        } else {
                                element->prev = head->prev;
                                element->next = head;
                                head->prev->next = element;
                                head->prev = element;
                        }
                        //cout<<"Adding Node :"<<element->value<<" size: "<<size<<endl;
                        size++;
                }
                std::string toString(){
                        if(size==0){
                                return "{}";
                        }
                        Node* current = head;
                        std::string output = "{";
                        do{
                                output+="[";
                                output+=  std::to_string(current->value);
                                output+="], ";
                                current=current->next;

                        } while(current != head);
                        output += "}";
                        return output;
                } 

                std::string toStringMultiple(long long int multiple){
                        if(size==0){
                                return "{}";
                        }
                        Node* current = head;
                        long long int value;
                        std::string output = "{";
                        do{
                                output+="[";
                                value = multiple*current->value;
                                output+=  std::to_string(value);
                                output+="], ";
                                current=current->next;

                        } while(current != head);
                        output += "}";
                        return output;
                } 

                std::string backwardsToString(){
                        if(size==0){
                                return "{}";
                        }
                        Node* current = head;
                        std::string output = "{";
                        do{
                                output+="[";
                                output+=  std::to_string(current->value);
                                output+="], ";
                                current=current->prev;

                        } while(current != head);
                        output += "}";
                        return output;
                } 

        private:
                int size;
                Node* head;

};

int day18a(CircularList encryptedList, vector<Node*> originalOrder, Node* zeroNode) {
        for(int i=0;i<originalOrder.size();i++){
                encryptedList.moveOneElement(originalOrder[i],originalOrder[i]->value);
                //cout<<encryptedList.toString()<<endl;
                //cout<<"Backwards: "<<encryptedList.backwardsToString()<<endl;
        }
        cout<<"Size: "<<originalOrder.size()<<endl;
        int first=encryptedList.getElementFrom(zeroNode,1000)->value;
        int second=encryptedList.getElementFrom(zeroNode,2000)->value;
        int third=encryptedList.getElementFrom(zeroNode,3000)->value;
        cout<<"First: "<<first<<" Second: "<<second<<" Third: "<<third<<endl;
        return first+second+third;
}

long long int day18b(CircularList encryptedList, vector<Node*> originalOrder, Node* zeroNode) {
        int decryptionKey=811589153;
        //cout<<encryptedList.toStringMultiple(decryptionKey)<<endl;
        for(int j=0;j<10;j++){
                for(int i=0;i<originalOrder.size();i++){
                        long long int distance = originalOrder[i]->value;
                        distance = distance * decryptionKey;
                        encryptedList.moveOneElement(originalOrder[i],distance);
                        //cout<<"Backwards: "<<encryptedList.backwardsToString()<<endl;
                }
                cout<<"Running: "<<j+1<<" times..."<<endl;
                //cout<<encryptedList.toStringMultiple(decryptionKey)<<endl;
        }
        //cout<<"Size: "<<originalOrder.size()<<endl;
        long long int first=encryptedList.getElementFrom(zeroNode,1000)->value;
        long long int second=encryptedList.getElementFrom(zeroNode,2000)->value;
        long long int third=encryptedList.getElementFrom(zeroNode,3000)->value;
        first *= decryptionKey;
        second *= decryptionKey;
        third *= decryptionKey;
        cout<<"First: "<<first<<" Second: "<<second<<" Third: "<<third<<endl;
        return first+second+third;
}

int main(){
        cout<<"Hello day 20"<<endl;
        ifstream inFile("day20.txt");
        CircularList testEncryptedList;
        vector<Node*> testOriginalOrder;
        Node* testZeroNode;
        CircularList encryptedList;
        vector<Node*> originalOrder;
        Node* zeroNode;
        string line;
        
        while(std::getline(inFile,line)) 
        {
                int currentValue=stoi(line);
                Node* current = new Node();// should delete all these nodes when exiting the program.
                current->value=currentValue;
                //cout<<"Current Node value: "<<currentValue<<endl;
                originalOrder.push_back(current);
                encryptedList.add(current);
                if(currentValue == 0){
                        zeroNode = current;
                }
        }
        ifstream testFile("day20_test.txt");
        while(std::getline(testFile, line)) 
        {
                int currentValue=stoi(line);
                Node* current = new Node();// should delete all these nodes when exiting the program.
                current->value=currentValue;
                //cout<<"Current Node value: "<<currentValue<<endl;
                testOriginalOrder.push_back(current);
                testEncryptedList.add(current);
                if(currentValue == 0){
                        testZeroNode = current;
                }
        }
        cout<<testEncryptedList.toString()<<endl;
        int testPartA = day18a(testEncryptedList,testOriginalOrder, testZeroNode);
        int partA = day18a(encryptedList,originalOrder, zeroNode);
        CircularList testEncryptedListPartB; // I modified the original list in PartA, so reseting...
        for(int i=0;i<testOriginalOrder.size();i++){
                testEncryptedListPartB.add(testOriginalOrder[i]);
        }
        CircularList encryptedListPartB; // I modified the original list in PartA, so reseting...
        for(int i=0;i<originalOrder.size();i++){
                 encryptedListPartB.add(originalOrder[i]);
        }
        int testPartB = day18b(testEncryptedListPartB,testOriginalOrder, testZeroNode);
        long long int partB = day18b(encryptedListPartB,originalOrder, zeroNode);
        cout<<"Test Result: "<<testPartA<<endl;
        cout<<"PartA Result: "<<partA<<endl;
        cout<<"Test Part B Result: "<<testPartB<<endl;
        cout<<"PartB Result: "<<partB<<endl;
        cout<<"After Close: "<<endl;
        return 0;
}



