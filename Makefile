all: jafa

jafa: lex.yy.c JaFA.tab.c semantics.c ast.c jafa_compiler.c
gcc lex.yy.c JaFA.tab.c semantics.c ast.c jafa_compiler.c -o jafa -lfl

lex.yy.c: JaFA.L
flex JaFA.L

JaFA.tab.c JaFA.tab.h: JaFA.y
bison -d -v JaFA.y

clean:
rm -f lex.yy.c JaFA.tab.c JaFA.tab.h JaFA.output jafa

.PHONY: all clean
