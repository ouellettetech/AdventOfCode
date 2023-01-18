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

enum VisitedDirection{
        XPOS,
        XNEG,
        YPOS,
        YNEG,
        ZPOS,
        ZNEG
};

static const string EnumStrings[] = { "XPOS","XNEG","YPOS","YNEG","ZPOS","ZNEG" };

const string getTextForEnum( int enumVal )
{
  return EnumStrings[enumVal];
}

class Position {
        public: 
                Position(int newX,int newY, int newZ){
                        Position(newX,newY,newZ,XPOS);
                }
                Position(int newX,int newY, int newZ, VisitedDirection newDirection){
                        //cout<<"Calling Position With X: "<<newX<<" Y: "<<newY<<" Z: "<<newZ<<endl;
                        x = newX;
                        y = newY;
                        z = newZ;
                        direction = newDirection;
                }
                Position(){
                        //cout<<"Calling Empty Position..."<<endl;
                        Position(-1,-1,-1);
                }
                int getMaxValue(){
                        int max=x;
                        if(y>max){
                                max = y;
                        }
                        if(z>max){
                                max = z;
                        }
                        return max;
                }
                int x;
                int y;
                int z;
                VisitedDirection direction;
};

class VisitedState {
        public:
                VisitedState(){
                        XPos = XNeg = YPos = YNeg = ZPos = ZNeg = false;
                }
                bool checkAndMarkVisited(VisitedDirection direction){
                        bool returnVal;
                        switch (direction){
                                case XPOS:
                                        returnVal = XPos;
                                        XPos = true;
                                        break;
                                case XNEG:
                                        returnVal = XNeg;
                                        XNeg = true;
                                        break;
                                case YPOS:
                                        returnVal = YPos;
                                        YPos = true;
                                        break;
                                case YNEG:
                                        returnVal = YNeg;
                                        YNeg = true;
                                        break;
                                case ZPOS:
                                        returnVal = ZPos;
                                        ZPos = true;
                                        break;
                                case ZNEG:
                                        returnVal = ZNeg;
                                        ZNeg = true;
                                        break;
                        }
                        return returnVal;
                }
        private:
                bool XPos;
                bool XNeg;
                bool YPos;
                bool YNeg;
                bool ZPos;
                bool ZNeg;
};

class Cube {
        public:
                Cube();
                Cube(std::string cubeLine);
                Cube(int X,int Y, int Z);
                int getX();
                int getY();
                int getZ();
                bool isValid();
                bool checkAndMarkVisited(VisitedDirection direction);
                int getMaxValue();
                VisitedDirection getDirection();
        private:
                Position pos;
                VisitedState visited;
                bool valid;
};

Cube::Cube(int X,int Y, int Z){
        pos = Position(X,Y,Z); // intialize with null value.
        if(X == -1 || Y == -1 || Z == -1){
                valid =false;
        } else {
                valid = true;
        }
}

Cube::Cube(){
        pos = Position(-1,-1,-1); // intialize with null value.
        valid = false;
}

Cube::Cube(std::string cubeLine){
//        cout<<"Original String: "<<cubeLine<<endl;
        vector<std::string> lineValues = strSplit(cubeLine, ',');
        pos = Position(-1,-1,-1); // intialize with null value.
        if(lineValues.size() != 3){
                cout<<"Invalid Cube!!!!"<<endl;
                return;
        }
        pos.x = stoi(lineValues[0]);
        pos.y = stoi(lineValues[1]);
        pos.z = stoi(lineValues[2]);
        if(pos.x == -1 || pos.y == -1 || pos.z == -1){
                valid =false;
        } else {
                valid = true;
        }
}

int Cube::getX(){
        return pos.x;
}
int Cube::getY(){
        return pos.y;
}
int Cube::getZ(){
        return pos.z;
}
VisitedDirection Cube::getDirection(){
        return pos.direction;
}

bool Cube::isValid(){
        return valid;
}

int Cube::getMaxValue(){
        return pos.getMaxValue();
}

bool Cube::checkAndMarkVisited(VisitedDirection direction){
        if(isValid()){
                return visited.checkAndMarkVisited(direction);
        }
        return visited.checkAndMarkVisited(ZPOS); // if its invalid we don't want to visit it multiple times.
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
        //cout<<"X: "<<x<<" Y: "<<y<<" Z: "<<z<<endl;
        return lookup[x][y][z].isValid();
}

queue<Position> populateStart(vector<vector<vector<Cube>>> cubeMap,  int maxValue){
      queue<Position> toCheckQueue;
      for(int i=0;i<=maxValue;i++){
        // Moving X
        toCheckQueue.push(Position(i,0,0,YPOS));
        toCheckQueue.push(Position(i,0,maxValue, YPOS));
        toCheckQueue.push(Position(i,maxValue,0, YNEG));
        toCheckQueue.push(Position(i,maxValue,maxValue, YNEG));

        toCheckQueue.push(Position(i,0,0,ZPOS));
        toCheckQueue.push(Position(i,0,maxValue, ZNEG));
        toCheckQueue.push(Position(i,maxValue,0, ZPOS));
        toCheckQueue.push(Position(i,maxValue,maxValue, ZNEG));

        // Moving Y
        toCheckQueue.push(Position(0,i,0,XPOS));
        toCheckQueue.push(Position(maxValue,i,0,XNEG));
        toCheckQueue.push(Position(0,i,maxValue,XPOS));
        toCheckQueue.push(Position(maxValue,i,maxValue,XNEG));

        toCheckQueue.push(Position(0,i,0,ZPOS));
        toCheckQueue.push(Position(maxValue,i,0,ZPOS));
        toCheckQueue.push(Position(0,i,maxValue, ZNEG));
        toCheckQueue.push(Position(maxValue,i,maxValue, ZNEG));

        // Moving Z
        toCheckQueue.push(Position(0,0,i,XPOS));
        toCheckQueue.push(Position(maxValue,0, i,XNEG));
        toCheckQueue.push(Position(0,maxValue, i, XPOS));
        toCheckQueue.push(Position(maxValue,maxValue, i, XNEG));
        
        toCheckQueue.push(Position(0,0,i, YPOS));
        toCheckQueue.push(Position(maxValue,0, i, YPOS));
        toCheckQueue.push(Position(0,maxValue, i,YNEG));
        toCheckQueue.push(Position(maxValue,maxValue, i, YNEG));
      }
      return toCheckQueue;
}

int calcOutsideSurface(vector<vector<vector<Cube>>> cubeMap, int maxValue){
        queue<Position> toCheckQueue = populateStart(cubeMap, maxValue);
        int surface = 0;
        //int posCount = 1;
        Position curPosition;
        while(!toCheckQueue.empty()){
                curPosition = toCheckQueue.front();
                toCheckQueue.pop();
                //cout<<"Count: "<<posCount<<" Direction: "<<getTextForEnum(curPosition.direction)<<" Surface: "<<surface<<" CurrentCube X: "<<curPosition.x<<" Y:"<<curPosition.y<<" Z: "<<curPosition.z<<endl;
                //posCount++;
                if(!cubeMap[curPosition.x][curPosition.y][curPosition.z].checkAndMarkVisited(curPosition.direction)){
                        if(cubeMap[curPosition.x][curPosition.y][curPosition.z].isValid()){
                                surface++;
                                //cout<<"Valid...."<<endl;
                                //cout<<"Visited.... Direction: "<<getTextForEnum(curPosition.direction)<<" Surface: "<<surface<<" CurrentCube X: "<<curPosition.x<<" Y:"<<curPosition.y<<" Z: "<<curPosition.z<<endl;
                        } else {
                                //cout<<"Not Valid..."<<endl;
                                if(curPosition.x>0 && curPosition.direction != XPOS){
                                        toCheckQueue.push(Position(curPosition.x-1,curPosition.y,curPosition.z,XNEG));
                                        //cout<<"Adding X: "<<curPosition.x-1<<" Y: "<<curPosition.y<<" Z: "<<curPosition.z<<" Direction"<<getTextForEnum(XNEG)<<endl;
                                }
                                if(curPosition.x<maxValue && curPosition.direction != XNEG){
                                        toCheckQueue.push(Position(curPosition.x+1,curPosition.y,curPosition.z,XPOS));
                                        //cout<<"Adding X: "<<curPosition.x+1<<" Y: "<<curPosition.y<<" Z: "<<curPosition.z<<" Direction"<<getTextForEnum(XPOS)<<endl;

                                }

                                if(curPosition.y>0 && curPosition.direction != YPOS){
                                        toCheckQueue.push(Position(curPosition.x,curPosition.y-1,curPosition.z,YNEG));
                                        //cout<<"Adding X: "<<curPosition.x<<" Y: "<<curPosition.y-1<<" Z: "<<curPosition.z<<" Direction"<<getTextForEnum(YNEG)<<endl;
                                }
                                if(curPosition.y<maxValue && curPosition.direction != YNEG){
                                        toCheckQueue.push(Position(curPosition.x,curPosition.y+1,curPosition.z,YPOS));
                                        //cout<<"Adding X: "<<curPosition.x<<" Y: "<<curPosition.y+1<<" Z: "<<curPosition.z<<" Direction"<<getTextForEnum(YPOS)<<endl;
                                }

                                if(curPosition.z>0 && curPosition.direction != ZPOS){
                                        toCheckQueue.push(Position(curPosition.x,curPosition.y,curPosition.z-1,ZNEG));
                                        //cout<<"Adding X: "<<curPosition.x<<" Y: "<<curPosition.y<<" Z: "<<curPosition.z-1<<" Direction"<<getTextForEnum(ZNEG)<<endl;
                                }
                                if(curPosition.z<maxValue && curPosition.direction != ZNEG){
                                        toCheckQueue.push(Position(curPosition.x,curPosition.y,curPosition.z+1,ZPOS));
                                        //cout<<"Adding X: "<<curPosition.x<<" Y: "<<curPosition.y<<" Z: "<<curPosition.z+1<<" Direction"<<getTextForEnum(ZPOS)<<endl;
                                }
                        }
                }
        }
        return surface;

}

int calcSurface(vector<Cube> fallingCubes, vector<vector<vector<Cube>>> lookup){
        int surface = 0;
        for(int i=0;i<fallingCubes.size();i++){
                Cube curCube = fallingCubes[i];
                if(!hasEdge(curCube.getX()-1, curCube.getY(), curCube.getZ(), lookup)){
                        //cout<<"X-1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
                if(!hasEdge(curCube.getX()+1, curCube.getY(), curCube.getZ(), lookup)){
                        //cout<<"X+1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY()-1, curCube.getZ(), lookup)){
                        //cout<<"Y-1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY()+1, curCube.getZ(), lookup)){
                        //cout<<"Y+1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY(), curCube.getZ()-1, lookup)){
                        //cout<<"Z-1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
                if(!hasEdge(curCube.getX(), curCube.getY(), curCube.getZ()+1, lookup)){
                        //cout<<"Z+1 Surface: "<<surface<<" CurrentCube X: "<<fallingCubes[i].getX()<<" Y:"<<fallingCubes[i].getY()<<" Z: "<<fallingCubes[i].getZ()<<endl;
                        surface++;
                }
        }
        return surface;

}
vector<vector<vector<Cube>>> createLookup(vector<Cube> fallingCubes){
        vector<vector<vector<Cube>>> lookupTable;
        Cube emptyCube = Cube(-1,-1,-1);
        //cout<<"Empty Cube X:"<<emptyCube.getX()<<" Y: "<<emptyCube.getY()<<" Z: "<<emptyCube.getZ()<<endl;
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
                        lookupTable[x][y].resize(z+1,emptyCube);
                }
                lookupTable[x][y][z] = curCube;
        }
        return lookupTable;
}

vector<vector<vector<Cube>>> createLookup(vector<Cube> fallingCubes, int maxValue){
        vector<vector<vector<Cube>>> lookupTable;
        Cube emptyCube = Cube(-1,-1,-1);
        lookupTable.resize(maxValue+1);
        for(int x=0;x<maxValue+1;x++){
                lookupTable[x].resize(maxValue+1);
                for(int y=0;y<maxValue+1;y++){
                        lookupTable[x][y].resize(maxValue+1, emptyCube);
                }
        }

        for(int i=0;i<fallingCubes.size();i++){
                Cube curCube = fallingCubes[i];
                int curX = curCube.getX();
                int curY = curCube.getY();
                int curZ = curCube.getZ();
                lookupTable[curX][curY][curZ] = curCube;
                if(curCube.getX() != lookupTable[curX][curY][curZ].getX()){
                        cout<<"Error lookupTable not created correctly!!!!"<<endl;
                }
                if(curCube.getY() != lookupTable[curX][curY][curZ].getY()){
                        cout<<"Error lookupTable not created correctly!!!!"<<endl;
                }
                if(curCube.getZ() != lookupTable[curX][curY][curZ].getZ()){
                        cout<<"Error lookupTable not created correctly!!!!"<<endl;
                }
        }
        return lookupTable;
}

int day18a(vector<Cube> fallingCubes) {
        vector<vector<vector<Cube>>> lookup = createLookup(fallingCubes);
        return calcSurface(fallingCubes, lookup);
}

long long int day18b(vector<Cube> fallingCubes, int maxValue) {
        vector<vector<vector<Cube>>> lookup = createLookup(fallingCubes, maxValue);
        return calcOutsideSurface(lookup, maxValue);
}

int main(){
        cout<<"Hello" << endl;
        ifstream inFile("day18.txt");
        vector<Cube> fallingCubes;
        string line;
        int maxValue=-1;
        int curMax;
        while(std::getline(inFile,line)) 
        {
                Cube curCube = Cube(line);
                curMax = curCube.getMaxValue();
                if(curMax> maxValue){
                        maxValue = curMax;
                }
                fallingCubes.push_back(curCube);

        }
        maxValue++;
        ifstream testFile("day18_test.txt");
        vector<Cube> fallingCubesTest;
        int testMaxValue=-1;
        while(std::getline(testFile, line)) 
        {
                Cube curCube = Cube(line);
                curMax = curCube.getMaxValue();
                if(curMax> testMaxValue){
                        testMaxValue = curMax;
                }
                fallingCubesTest.push_back(curCube);
        }
        testMaxValue++;
        cout<<"Max Value: "<<maxValue<<" Test Max Value: "<<testMaxValue<<endl;
        int partA = day18a(fallingCubes);
        int testPartA = day18a(fallingCubesTest);
        int testPartB = day18b(fallingCubesTest, testMaxValue);
        int partB = day18b(fallingCubes, maxValue);
        cout<<"Test Result: "<<testPartA<<endl;
        cout<<"PartA Result: "<<partA<<endl;
        cout<<"PartB Result: "<<partB<<endl;
        cout<<"Test Part B Result: "<<testPartB<<endl;
        cout<<"After Close: "<<endl;
        return 0;
}



