#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stack>
#include <climits>
#include <string.h>
#include <sstream>

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

//2,2,2
class Cube {
        public:
                Cube();
                Cube(std::string cubeLine);
                int getX();
                int getY();
                int getZ();
                bool isValid();
        private:
                int x;
                int y;
                int z;
};

Cube::Cube(){
        x=y=z=-1; // intialize with null value.
//	cout<<"Never should be called"<<endl;
}
Cube::Cube(std::string cubeLine){
//        cout<<"Original String: "<<cubeLine<<endl;
        vector<std::string> lineValues = strSplit(cubeLine, ',');
        x=y=z=-1; // intialize with null value.
        if(lineValues.size() != 3){
                cout<<"Invalid Cube!!!!"<<endl;
                return;
        }
        x = stoi(lineValues[0]);
        y = stoi(lineValues[1]);
        z = stoi(lineValues[2]);
}

int Cube::getX(){
        return x;
}
int Cube::getY(){
        return y;
}
int Cube::getZ(){
        return z;
}
bool Cube::isValid(){
        if(x == -1 || y == -1 || z == -1){
                return false;
        }
        return true;
}

bool hasEdge(int x, int y, int z, vector<vector<vector<Cube>>> lookup) {
        if(x >= lookup.size() || x < 0){
                return false;
        }
        if(y >= lookup[x].size() || y < 0){
                return false;
        }
        if(z >= lookup[x][y].size() || z < 0){
                return false;
        }
//        cout<<"X: "<<x<<" Y: "<<y<<" Z: "<<z<<endl;
        return lookup[x][y][z].isValid();
}

int calcSurface(vector<Cube> fallingCubes, vector<vector<vector<Cube>>> lookup){
        int surface = 0;
        for(int i=0;i<fallingCubes.size();i++){
                Cube curCube = fallingCubes[i];
                if(!hasEdge(curCube.getX()-1, curCube.getY(), curCube.getZ(), lookup)){
                        surface++;
                }
                if(!hasEdge(curCube.getX()+1, curCube.getY(), curCube.getZ(), lookup)){
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY()-1, curCube.getZ(), lookup)){
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY()+1, curCube.getZ(), lookup)){
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY(), curCube.getZ()-1, lookup)){
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY(), curCube.getZ()+1, lookup)){
                        surface++;
                }
        }
        return surface;

}
vector<vector<vector<Cube>>> createLookup(vector<Cube> fallingCubes){
        vector<vector<vector<Cube>>> lookupTable;
        for(int i=0;i<fallingCubes.size();i++){
                Cube curCube = fallingCubes[i];
                int x = curCube.getX();
                int y = curCube.getY();
                int z = curCube.getZ();
                if(x+1 > lookupTable.size()){
                        lookupTable.resize(x+1);
                }
                if(y+1 > lookupTable[x].size()){
                        lookupTable[x].resize(y+1);
                }
                if(z+1 > lookupTable[x][y].size()){
                        lookupTable[x][y].resize(z+1);
                }
                lookupTable[x][y][z] = curCube;
        }
        return lookupTable;
}
int day18a(vector<Cube> fallingCubes) {
        vector<vector<vector<Cube>>> lookup = createLookup(fallingCubes);
        return calcSurface(fallingCubes, lookup);
}

long long int day18b() {
        return 0;
}

int main(){
        cout<<"Hello" << endl;
        ifstream inFile("day18.txt");
        vector<Cube> fallingCubes;
        string line;
        while(std::getline(inFile,line)) 
        {
                Cube curCube = Cube(line);
                fallingCubes.push_back(curCube);

        }

        ifstream testFile("day18_test.txt");
        vector<Cube> fallingCubesTest;
        while(std::getline(testFile, line)) 
        {
                Cube curCube = Cube(line);
                fallingCubesTest.push_back(curCube);
        }
        
        int partA = day18a(fallingCubes);
        int testPartA = day18a(fallingCubesTest);
   //long long int testPartB = day18b(monkeyTalkTest);
   //long long int partB = day18b(monkeyTalk);
        cout<<"Test Result: "<<testPartA<<endl;
        cout<<"PartA Result: "<<partA<<endl;
   //cout<<"PartB Result: "<<partB<<endl;
   //cout<<"Test Part B Result: "<<testPartB<<endl;
        cout<<"After Close: "<<endl;
        return 0;
}



