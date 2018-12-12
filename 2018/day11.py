import re

class PowerCell:
  def __init__(self, x, y):
    self.currentPowerLevel_1 = 0
    self.current3_3_PowerLevel = 0
    self.x = x
    self.y = y

class Grid:
  def __init__(self, size): 
    self.size = size
    self.grid = [[PowerCell(i,j) for i in range(size)] for j in range(size)]
  def get(self, x, y):
    return self.grid[y][x]
  def fillGrid(self, specialNum):
    for x in range(self.size): # I could just iterate over the grid, but I like using the get function in case we cahnge this later, 
      #and it makes it easier to remember which axis is X/Y
      for y in range(self.size): 
        powerLevel = self.getPowerLevelOfCell(x, y, specialNum)
        self.get(x,y).currentPowerLevel_1 = powerLevel
        self.get(x,y).currentColumn_1 = powerLevel
        self.get(x,y).currentRow_1 = 0
  def getMax3_3_Grid(self):
    currentMax = 0
    maxX = 0
    maxY = 0
    for x in range(self.size-2): # I could just iterate over the grid, but I like using the get function in case we cahnge this later, 
      #and it makes it easier to remember which axis is X/Y
      for y in range(self.size-2): 
        currentLevel = 0
        for i in range(3):
          for j in range(3):
            currentLevel += self.get(x+i,y+j).currentPowerLevel_1
        if(currentLevel> currentMax):
          currentMax = currentLevel
          maxX = x
          maxY = y
        self.get(x,y).current3_3_PowerLevel = currentLevel
    return 'Coord: {0},{1} currentMax = {2}'.format(maxX,maxY,currentMax)

  def getSubPower(self,x,y,subSize):
    currentLevel = getattr(self.get(x,y), 'currentPowerLevel_{0}'.format(subSize-1))
    colVal = getattr(self.get(x+subSize-1,y), 'currentColumn_{0}'.format(subSize-1)) + self.get(x+subSize-1,y+subSize-1).currentPowerLevel_1
    #print('New Col Val: {0}'.format(colVal))
    setattr(self.get(x+subSize-1,y), 'currentColumn_{0}'.format(subSize), colVal)
    rowVal = getattr(self.get(x,y+subSize-1), 'currentRow_{0}'.format(subSize-1)) + self.get(x+subSize-2,y+subSize-1).currentPowerLevel_1
    setattr(self.get(x,y+subSize-1), 'currentRow_{0}'.format(subSize), rowVal)
    #print('New Row Val: {0}'.format(rowVal))
    currentLevel += colVal+ rowVal
    setattr(self.get(x,y), 'currentPowerLevel_{0}'.format(subSize), currentLevel)
    return currentLevel
  def getMaxSub_Grid(self):
    currentMax = 0
    maxX = 0
    maxY = 0
    maxSize = 1
    for subSize in range(2,self.size):
      print('Checking Subs of size: {0}'.format(subSize))
      for x in range(self.size-subSize): # I could just iterate over the grid, but I like using the get function in case we cahnge this later, 
      #and it makes it easier to remember which axis is X/Y
        for y in range(self.size-subSize): 
          currentLevel = self.getSubPower(x,y,subSize)
          if(currentLevel> currentMax):
            currentMax = currentLevel
            maxX = x
            maxY = y
            maxSize = subSize
    return 'Coord: {0},{1} Size : {2} currentMax = {3}'.format(maxX,maxY,maxSize, currentMax)
  def getPowerLevelOfCell(self, x, y, specialNum):
    rackID = x+10
    temp = rackID * y
    temp += specialNum
    temp = temp * rackID
    temp = int(temp/100)%10
    return temp - 5
  def printGrid(self,part=0):
    if part == 0:
      part = self.size
    for y in range(part):
      currentLine = ""
      for x in range(part):
        curPow = self.get(x,y).currentPowerLevel_1
        currentLine+= str(curPow) + ","
      print(currentLine)

testGrid = Grid(300)
print('Test of 3,5 with special of 8 : {0}'.format(testGrid.getPowerLevelOfCell(3,5,8)))
print('Test of 122,79 with special of 57 : {0}'.format(testGrid.getPowerLevelOfCell(122,79,57)))
print('Test of 217,196 with special of 39 : {0}'.format(testGrid.getPowerLevelOfCell(217,196,39)))
print('Test of 101,153 with special of 71 : {0}'.format(testGrid.getPowerLevelOfCell(101,153,71)))
testGrid = Grid(300)
testGrid.fillGrid(18)
print(testGrid.getMax3_3_Grid())
testGrid = Grid(300)
testGrid.fillGrid(42)
print(testGrid.getMax3_3_Grid())

testGrid = Grid(300)
testGrid.fillGrid(18)
print(testGrid.getMaxSub_Grid())
testGrid.printGrid(5)
print(testGrid.getSubPower(0,0,2))
print(testGrid.get(1,0).currentColumn_1)
print(testGrid.get(1,0).currentRow_1)
testGrid = Grid(300)
testGrid.fillGrid(42)
print(testGrid.getMaxSub_Grid())
print("Done Testing")
testGrid = Grid(300)
testGrid.fillGrid(5468)
print("Part A")
print(testGrid.getMax3_3_Grid())
print("Part B")
print(testGrid.getMaxSub_Grid())
