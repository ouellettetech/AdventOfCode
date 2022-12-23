#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stack>
#include <climits>


using namespace std;

class Operation;
class Value {
         public:
		Value();
                Value(std::string valueLine);
                ~Value();
                long long int lookupValue(map<std::string, Value> monkeyTalk);
                long long int getRootCompareValue(map<std::string, Value> monkeyTalk);
                pair<bool,long long int> lookupHumanValue(map<std::string, Value> monkeyTalk,std::stack<Operation> &opsFromHuman);
        private:
                Operation* op;
                long long int value;
                bool finalized;
};

class Operation {
        public:
                Operation(std::string operationLine){
                        firstOp = operationLine.substr(0,4);
                        operand = operationLine[5];
                        secondOp = operationLine.substr(7);
                        //cout<<"setting op ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                }
                long long int lookupValue(map<std::string, Value> monkeyTalk){
                        //cout<<"Looking up value of ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                        switch(this->operand){
                                case '*':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) * monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '-':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) - monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '/':
                                        if((monkeyTalk[firstOp].lookupValue(monkeyTalk) % monkeyTalk[secondOp].lookupValue(monkeyTalk)) != 0){
                                                cout<<"!!!!!!Warning Remainder..."<<endl;
                                        }
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) / monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '+':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) + monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                        }
                        cout<<"Eror unknown operand: "<<operand<<endl;
                        return 0;
                }
                long long int lookupCompValue(map<std::string, Value> monkeyTalk){
                        std::stack<Operation> opsFromHuman;
                        pair<bool,long long int> firstPart = monkeyTalk[firstOp].lookupHumanValue(monkeyTalk, opsFromHuman);
                        pair<bool,long long int> secondPart = monkeyTalk[secondOp].lookupHumanValue(monkeyTalk, opsFromHuman);
                        //cout<<"First Part contains Human: "<<firstPart.first<<" Value: "<<firstPart.second<<" Second Part Contains Human: "<<secondPart.first<<" Value: "<<secondPart.second<<endl;
                        if(firstPart.first){
                                return reverseOps(secondPart.second, opsFromHuman,monkeyTalk);
                        }
                        return reverseOps(firstPart.second, opsFromHuman,monkeyTalk);
                }
                pair<bool,long long int> lookupHumanValue(map<std::string, Value> monkeyTalk, std::stack<Operation> &opsFromHuman){
                        //cout<<"Looking up value of ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                        if(firstOp== "humn"){
                                opsFromHuman.push(*this);
                                return pair<bool,long long int>(true,monkeyTalk[secondOp].lookupValue(monkeyTalk));
                        }
                        if(secondOp== "humn"){
                                opsFromHuman.push(*this);
                                return pair<bool,long long int>(true,monkeyTalk[firstOp].lookupValue(monkeyTalk));
                        }
                        pair<bool,long long int> firstOpVal = monkeyTalk[firstOp].lookupHumanValue(monkeyTalk, opsFromHuman);
                        pair<bool,long long int> secondOpVal = monkeyTalk[secondOp].lookupHumanValue(monkeyTalk,opsFromHuman);
                        if(firstOpVal.first){
                                Operation opsCopy(*this);
                                opsCopy.firstOp = "humn";
                                opsFromHuman.push(opsCopy);
                                return firstOpVal;
                        }
                        if(secondOpVal.first){
                                Operation opsCopy(*this);
                                opsCopy.secondOp = "humn";
                                opsFromHuman.push(opsCopy);
                                return secondOpVal;
                        }
                        //cout<<"From value of ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                        //cout<<"\tRunning Operation ["<<firstOpVal.second <<"] ["<<operand<<"] ["<<secondOpVal.second<<"]"<<endl;
                        switch(this->operand){
                                case '*':
                                        return pair<bool,long long int>(false,firstOpVal.second * secondOpVal.second);
                                        break;
                                case '-':
                                        return pair<bool,long long int>(false,firstOpVal.second - secondOpVal.second);
                                        break;
                                case '/':
                                        return pair<bool,long long int>(false,firstOpVal.second / secondOpVal.second);
                                        break;
                                case '+':
                                        return pair<bool,long long int>(false,firstOpVal.second + secondOpVal.second);
                                        break;
                        }
                        cout<<"Eror unknown operand: "<<operand<<endl;
                        return pair<bool,long long int>(false,0);
                }
        private:
                std::string firstOp;
                std::string secondOp;
                char operand;
                long long int reverseOps(long long int MatchValue, std::stack<Operation> opsFromHuman,map<std::string, Value> monkeyTalk){
                        //cout<<"!!! Running Reverse Operation...!!!"<<endl;
                        long long int currentValue = MatchValue;
                        while(!opsFromHuman.empty()){
                                Operation current = opsFromHuman.top();
                                opsFromHuman.pop();
                                //cout<<"From value of ["<<current.firstOp<<"] ["<<current.operand<<"] ["<<current.secondOp<<"]"<<endl;

                                long long int firstOpVal = currentValue;
                                long long int secondOpVal;
                                if(current.firstOp == "humn"){
                                        secondOpVal = monkeyTalk[current.secondOp].lookupValue(monkeyTalk);
                                } else {
                                        secondOpVal = monkeyTalk[current.firstOp].lookupValue(monkeyTalk);
                                }
                                //cout<<"\tRunning opposite Operation ["<<firstOpVal <<"] ["<<current.operand<<"] ["<<secondOpVal<<"]"<<endl;
                                switch(current.operand){
                                        case '*':
                                                currentValue = firstOpVal / secondOpVal;
                                                break;
                                        case '-':                                               
                                                if(current.secondOp == "humn"){
                                                        currentValue = -1 *(firstOpVal - secondOpVal);
                                                } else {
                                                        currentValue = (firstOpVal + secondOpVal);
                                                }
                                                break;
                                        case '/':
                                                if(current.secondOp == "humn"){
                                                        currentValue = secondOpVal/firstOpVal;
                                                } else {
                                                        currentValue = firstOpVal * secondOpVal;
                                                }
                                                break;
                                        case '+':
                                                currentValue = firstOpVal - secondOpVal;
                                                break;
                                }
                                // if(current.firstOp == "humn"){
                                //         cout<<"\tReversing "<<currentValue<<current.operand<<secondOpVal<<" = "<<firstOpVal<<endl;
                                // } else {
                                //         cout<<"\tReversing "<<secondOpVal<<current.operand<<currentValue<<" = "<<firstOpVal<<endl;
                                // }
                                
                        }
                        return currentValue;
                }
};
Value::Value(){
	cout<<"Never should be called"<<endl;
        this->op = NULL;
}
Value::Value(std::string valueLine){
        if(valueLine.find_first_of(' ') != std::string::npos ){
                //cout<<"Creating op..."<<endl;
                Operation *createOp = new Operation(valueLine);
                this->op = createOp;
                this->finalized = false;
                this->value = 0;
                //cout<<"Created op..."<<endl;
        }
        else {
                this->value = stoi(valueLine);
                this->finalized = true;
        }
}
Value::~Value(){
        if(this->op != NULL){
               //delete this->op;
        }
}

long long int Value::getRootCompareValue(map<std::string, Value> monkeyTalk){
        return this->op->lookupCompValue(monkeyTalk);
}

long long int Value::lookupValue(map<std::string, Value> monkeyTalk){
        if(!finalized){
                this->value=this->op->lookupValue(monkeyTalk);
                this->finalized = true;
        }
        //cout<<"Returning Value: "<<value<<endl;
        return value;
}


pair<bool,long long int> Value::lookupHumanValue(map<std::string, Value> monkeyTalk,std::stack<Operation> &opsFromHuman){   
        //cout<<"\t\tlooking up Value, Finalized: "<<finalized<<" Value: "<<this->value<<endl;
        pair<bool,long long int> result = pair<bool,long long int>(false,0);
        if(!finalized){
                //cout<<"\t\t\tLooking up value of operation..."<<endl;
                result = this->op->lookupHumanValue(monkeyTalk, opsFromHuman);
                if(result.first){
                        this->finalized = true;
                }
        } else {
                //cout<<"\t\t\tValue has a real value: "<<value<<endl;
                result.second = value;
        }
        return result;
}

long long int day21a(map<std::string, Value> monkeyTalk) {
   return monkeyTalk["root"].lookupValue(monkeyTalk);
}

long long int day21b(map<std::string, Value> monkeyTalk) {
   return monkeyTalk["root"].getRootCompareValue(monkeyTalk);
}

int main(){
        cout<<"Hello" << endl;
        ifstream inFile("day21.txt");
        map<std::string, Value> monkeyTalk;
        string line;
        while(std::getline(inFile,line)) 
        {
//                cout<<"Line: "<<line<<endl;
		std::string monkey_name = line.substr(0,4);
		Value val = Value(line.substr(6));
	        //cout<<"parsing line..."<<endl;

		monkeyTalk.insert( std::map<std::string, Value>::value_type ( monkey_name, val ) );
//		cout<<"Line After"<<endl;
        }
//        cout<<"After Close: "<<endl;

        ifstream testFile("day21_test.txt");
        map<std::string, Value> monkeyTalkTest;
        while(std::getline(testFile,line)) 
        {
                //cout<<"Line: "<<line<<endl;
		std::string monkey_name = line.substr(0,4);
		Value val = Value(line.substr(6));
//	        cout<<"parsing line..."<<endl;

		monkeyTalkTest.insert( std::map<std::string, Value>::value_type ( monkey_name, val ) );
//		cout<<"Line After"<<endl;
        }
//        cout<<"After Close: "<<endl;

   long long int partA = day21a(monkeyTalk);
   long long int testPartA = day21a(monkeyTalkTest);
   long long int testPartB = day21b(monkeyTalkTest);
   long long int partB = day21b(monkeyTalk);
   cout<<"PartA Result: "<<partA<<endl;
   cout<<"Test Result: "<<testPartA<<endl;
   cout<<"PartB Result: "<<partB<<endl;
   cout<<"Test Part B Result: "<<testPartB<<endl;
   cout<<"After Close: "<<endl;
   return 0;
}



