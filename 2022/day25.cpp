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

class SNAFU{
        public:
                SNAFU(){
                }
                SNAFU(std::string snafuString){
                        for (std::string::reverse_iterator rit=snafuString.rbegin(); rit!=snafuString.rend(); ++rit){
                                switch(*rit){
                                        case '0':
                                                number.push_back(0);
                                                break;
                                        case '1':
                                                number.push_back(1);
                                                break;
                                        case '2':
                                                number.push_back(2);
                                                break;
                                        case '-':
                                                number.push_back(-1);
                                                break;
                                        case '=':
                                                number.push_back(-2);
                                                break;
                                        default:
                                                cout<<"Invalid String entered!"<<endl;
                                }
                        }
                }
                SNAFU(long long int intValue){
                        long long int currentValue = intValue;
                        int remainder;
                        int lastExtra=0;
                        if(intValue<0){
                                cout<<"Negative Number not implimented"<<endl;
                        } else {
                                while(currentValue!=0){
                                        remainder = currentValue % 5;
                                        currentValue = currentValue / 5;
                                        remainder = remainder + lastExtra;
                                        lastExtra = 0;
                                        if(remainder<3){
                                               number.push_back(remainder);
                                        } else {
                                                number.push_back(remainder - 5);
                                                lastExtra = 1;
                                        } 
                                }
                                if(lastExtra == 1){
                                        number.push_back(1);
                                }
                        }
                }
                long long int toInt(){
                        long long int runningTotal = 0;
                        long long int power = 1;
                        for(int i=0;i<number.size();i++){
                                runningTotal+=(number[i]*power);
                                power*=5;
                        };
                        return runningTotal;
                };
                std::string toString(){
                        std::string retString;
                        for (int i=number.size()-1;i>=0;i--){
                                switch(number[i]){
                                        case 0:
                                                retString+='0';
                                                break;
                                        case 1:
                                                retString+='1';
                                                break;
                                        case 2:
                                                retString+='2';
                                                break;
                                        case -1:
                                                retString+='-';
                                                break;
                                        case -2:
                                                retString+='=';
                                                break;
                                }
                        }
                        return retString;
                } 
        private:
                vector<int> number;
};

SNAFU day25a(vector<SNAFU> snafuNumbers) {
        long long int total = 0;
        for(int i=0;i<snafuNumbers.size();i++){
                //cout<<"Number Value :"<<snafuNumbers[i].toInt()<<" String: "<<snafuNumbers[i].toString()<<endl;
                total+=snafuNumbers[i].toInt();
        }
        // cout<<"testing: 1747 expected 1=-0-2"<<SNAFU(1747).toString()<<endl;
        // cout<<"testing: 906 expected 12111"<<SNAFU(906).toString()<<endl;
        // cout<<"testing: 198 expected  2=0=  "<<SNAFU(198).toString()<<endl;
        // cout<<"testing: 11 expected  21     "<<SNAFU(11).toString()<<endl;
        // cout<<"testing: 201 expected   2=01 "<<SNAFU(201).toString()<<endl;
        // cout<<"testing: 31 expected 111     "<<SNAFU(31).toString()<<endl;
        // cout<<"testing: 1257 expected 20012 "<<SNAFU(1257).toString()<<endl;
        // cout<<"testing: 32 expected  112    "<<SNAFU(32).toString()<<endl;
        // cout<<"testing: 353 expected 1=-1=  "<<SNAFU(353).toString()<<endl;
        // cout<<"testing: 107 expected 1-12   "<<SNAFU(107).toString()<<endl;
        // cout<<"testing: 7 expected 12       "<<SNAFU(7).toString()<<endl;
        // cout<<"testing: 3 expected 1=       "<<SNAFU(3).toString()<<endl;
        // cout<<"testing: 37 expected 122     "<<SNAFU(37).toString()<<endl;
        cout<<"Total: "<<total<<endl;
        return SNAFU(total);
}

long long int day25b(vector<SNAFU> snafuNumbers) {
        return 0;
}

int main(){
        cout<<"Hello day 25"<<endl;
        ifstream inFile("day25.txt");
        vector<SNAFU> snafuList;
        vector<SNAFU> testSnafuList;
        string line;
        
        while(std::getline(inFile,line)) 
        {
                SNAFU curNumber = SNAFU(line);
                snafuList.push_back(curNumber);
        }
        ifstream testFile("day25_test.txt");
        while(std::getline(testFile, line)) 
        {
                SNAFU curNumber = SNAFU(line);
                testSnafuList.push_back(curNumber);
        }
        SNAFU testPartA = day25a(testSnafuList);
        SNAFU partA = day25a(snafuList);
        
        //int testPartB = day18b(testEncryptedListPartB,testOriginalOrder, testZeroNode);
        //long long int partB = day18b(encryptedListPartB,originalOrder, zeroNode);
        cout<<"Test Result: "<<testPartA.toString()<<" Int value "<<testPartA.toInt()<<endl;
        cout<<"PartA Result: "<<partA.toString()<<" Int value "<<partA.toInt()<<endl;
        //cout<<"Test Part B Result: "<<testPartB<<endl;
        //cout<<"PartB Result: "<<partB<<endl;
        cout<<"After Close: "<<endl;
        return 0;
}



