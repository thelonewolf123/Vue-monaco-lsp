DIR=/Users/harish/Projects/Vue-monaco-demo/lang-server/java-lsp
java \
	-Declipse.application=org.eclipse.jdt.ls.core.id1 \
	-Dosgi.bundles.defaultStartLevel=4 \
	-Declipse.product=org.eclipse.jdt.ls.core.product \
	-Dlog.level=ALL \
	-noverify \
	-Xmx700m \
	--add-modules=ALL-SYSTEM \
	--add-opens java.base/java.util=ALL-UNNAMED \
	--add-opens java.base/java.lang=ALL-UNNAMED \
	-jar $DIR/jdt-language-server/plugins/org.eclipse.equinox.launcher_1.6.400.v20210924-0641.jar \
	-configuration $DIR/jdt-language-server/config_linux \
	-data /tmp/T/data