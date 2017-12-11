#include <iostream>
#include <fstream>
#include <vector>


using namespace std;

int day5b(vector<int> & stack) {
        int executions = 0;
        int currentSpace = 0;
        while(currentSpace>=0 && currentSpace < stack.size()){
                int offset = stack[currentSpace];
                cout << "Current Space: " << currentSpace <<  "Offset :" << offset << endl;
                int lastSpace = currentSpace;
                currentSpace = currentSpace + stack[currentSpace];
                if(offset>=3){
                        offset--;
                } else {
                        offset++;
                }
                stack[lastSpace] = offset;
                executions = executions + 1;
        }
        return executions;
}


int main(){
   cout<<"Hello" << endl;
   ifstream inFile;
   int x;
   vector<int> v; 
   inFile.open("day5.txt");
   if (!inFile) {
      cerr << "Unable to open file datafile.txt";
      exit(1);   // call system to stop
   }
   while (inFile >> x) {
     v.push_back(x);
     cout<<"Current Line: "<<x<<endl;   
   }
   inFile.close();
   int executions=day5b(v);
   cout<<" Total Executions :"<<executions<<endl;
   return 0;
}


