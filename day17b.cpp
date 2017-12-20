#include <iostream>
#include <fstream>
#include <vector>


using namespace std;

int main(){
   cout<<"Hello" << endl;
   int moves=345;
   long valueAfterZero=1;
   long currentLoc=0;
   long arrayLength=1;
   for(long i=1;i<=50000000;i++){
     currentLoc=(currentLoc+moves)%arrayLength;
     if(currentLoc==0){
       valueAfterZero=i;
     }
     currentLoc++;
     arrayLength++;
     cout<<"Current Value After 0"<<valueAfterZero<<endl;
   }
   return 0;
}


