CFLAGS = -c `pkg-config --cflags opencv`
LDFLAGS = `pkg-config --libs opencv`

CC=clang++

SOURCE_DIR=src
OBJ_DIR=obj
EXEC_DIR=target

ALL_CPP_FILES := $(wildcard ${SOURCE_DIR}/*.cpp)
TEST_FILES := $(wildcard ${SOURCE_DIR}/*Test.cpp)
USE_FILES := $(filter-out $(TEST_FILES),$(ALL_CPP_FILES))
OBJ_FILES = $(patsubst ${SOURCE_DIR}/%.cpp,${OBJ_DIR}/%.o,$(USE_FILES))

all: init imglib NNTimeSeriesTest

imglib: init ${OBJ_FILES}
	ar r ${EXEC_DIR}/imglib ${OBJ_FILES}
	
${OBJ_DIR}/%.o: ${SOURCE_DIR}/%.cpp 
	$(CC) $(CFLAGS) -o $@ $<
	
%Test: ${OBJ_DIR}/%Test.o 
	$(CC) -o ${EXEC_DIR}/$@ ${OBJ_DIR}/$@.o ${EXEC_DIR}/imglib  $(LDFLAGS)
	
init:
	mkdir -p ${OBJ_DIR} ${EXEC_DIR}

clean:
	/bin/rm -rf ${OBJ_DIR}/*.o ${EXEC_DIR}/*



