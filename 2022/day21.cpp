#include <iostream>
#include <fstream>
#include <vector>
#include <map>


using namespace std;

class Operation;
class Value {
         public:
		Value();
                Value(std::string valueLine);
                ~Value();
                long lookupValue(map<std::string, Value> monkeyTalk);
        private:
                Operation* op;
                long value;
                bool finalized;
};

class Operation {
        public:
                Operation(std::string operationLine){
                        firstOp = operationLine.substr(0,4);
                        operand = operationLine[5];
                        secondOp = operationLine.substr(7);
                        cout<<"setting op ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                }
                long lookupValue(map<std::string, Value> monkeyTalk){
                        cout<<"Looking up value of ["<<firstOp<<"] ["<<operand<<"] ["<<secondOp<<"]"<<endl;
                        switch(this->operand){
                                case '*':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) * monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '-':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) - monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '/':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) / monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                                case '+':
                                        return monkeyTalk[firstOp].lookupValue(monkeyTalk) + monkeyTalk[secondOp].lookupValue(monkeyTalk);
                                        break;
                        }
                        cout<<"Eror unknown operand: "<<operand<<endl;
                        return 0;
                }
        private:
                std::string firstOp;
                std::string secondOp;
                char operand;
};
Value::Value(){
	cout<<"Never should be called"<<endl;
}
Value::Value(std::string valueLine){
        if(valueLine.find_first_of(' ') != std::string::npos ){
                cout<<"Creating op..."<<endl;
                Operation *createOp = new Operation(valueLine);
                this->op = createOp;
                this->finalized = false;
                this->value = 0;
                cout<<"Created op..."<<endl;
        }
        else {
                this->value = stoi(valueLine);
                this->finalized = true;
        }
}
Value::~Value(){
        if(this->op != NULL){
//                delete this->op;
        }
}
long Value::lookupValue(map<std::string, Value> monkeyTalk){
        if(!finalized){
                this->value=this->op->lookupValue(monkeyTalk);
                this->finalized = true;
        }
        cout<<"Returning Value: "<<value<<endl;
        return value;
}


long day21a(map<std::string, Value> monkeyTalk) {
   return monkeyTalk["root"].lookupValue(monkeyTalk);
}

int main(){
        cout<<"Hello" << endl;
        ifstream inFile("day21.txt");
        map<std::string, Value> monkeyTalk;
        string line;
        while(std::getline(inFile,line)) 
        {
                cout<<"Line: "<<line<<endl;
		std::string monkey_name = line.substr(0,4);
		Value val = Value(line.substr(6));
	        cout<<"parsing line..."<<endl;

		monkeyTalk.insert( std::map<std::string, Value>::value_type ( monkey_name, val ) );
		cout<<"Line After"<<endl;
        }
        cout<<"After Close: "<<endl;

   long partA = day21a(monkeyTalk);
   //int executions=day5b(null);
   //cout<<" Total Executions :"<<executions<<endl;
   //cout<<"Test Result: "<<testAnswer<<endl;
   cout<<"PartA Result: "<<partA<<endl;
   cout<<"Test Result: "<<0<<endl;
   cout<<"After Close: "<<endl;
   return 0;
}



