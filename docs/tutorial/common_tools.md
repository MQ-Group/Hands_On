# 第 2 部分：实验室常用工具简介

在硬件设计过程中，可以基于 ASIC设计的流程，也可以基于 FPGA，两者涉及到的工具不太相同，这里分别做简要介绍。

## ASIC Flow下的基本流程和常用EDA工具介绍

ASIC Flow一般分为 **前端** 和 **后端**。前端的基本流程和"硬件电路设计|集成电路基本概念"-"我们实验室通常进行算法加速的一般步骤"中的f) & g)基本相同。后端主要是从h)开始到最终产生GDSII文件送给芯片制造商的工程，我们实验室现在暂时不做后端，所以我的了解也不是很深。

### ASIC Flow涉及的常用工具&软件

我们实验室有的，主要是Synopsys公司的EDA工具和TSMC的工艺库：

* **Verilog仿真**：Synopsys VCS， Mentor Modelsim
* **综合**：Synopsys Design Compiler（简称DC）
* **功耗分析**：Synopsys PrimeTime PX
* **静态时序分析（STA）**：Synopsys PrimeTime
* **版图设计与布局布线**：Synopsys IC Compiler
* **工艺库文件**：由芯片制造商（如台积电TSMC）提供的关于在某个工艺节点下的标准单元库（standard cell library）

### 关于这些工具使用的简单说明

1. **做Verilog仿真**：Mentor Modelsim可以在Windows下直接使用，比较方便，网上也有比较多的教程和资料，可以很快上手。Synopsys VCS只能在Linux下使用，而且主要基于命令行和脚本。

2. **综合**：DC是当下工业界用的最多的综合工具。主要是通过命令行使用。一般的ASIC Flow中脚本被大量使用。所以拿到一份模板脚本之后要学会看懂脚本和修改脚本。

## FPGA开发的基本流程介绍

一般来说，大规模的芯片开发会经历多轮验证迭代，确保万无一失后才能交付Fab进行tap out，除了在EDA工具上进行仿真验证外，另外一个重要的硬件验证平台就是FPGA。FPGA中文名叫现场可编程逻辑门阵列。

### FPGA开发流程

#### 1. 新建Vivado项目
打开Vivado，点击[create new project]，创建一个新的工程。

#### 2. 设计RTL代码
我们既可以直接在Vivado里面设计RTL代码，也可以在其他的仿真器里将设计好的RTL代码导入进Vivado里。

#### 3. 编译、仿真
点击Vivado界面左边的Simulation->Run Simulation->Run Behavioral Simulation。

![Vivado仿真步骤](assets/vivado_simulation.png)

#### 4. 综合（Synthesis）
仿真通过后，下一步即是综合，点击Synthesis->Run Synthesis。

![Vivado综合步骤](assets/vivado_synthesis.png)

#### 5. 实现（Implementation）
综合通过后，需要查询器件手册中的管脚（pin）信息，再根据这些信息修改XDC文件，XDC正确修改后即可进行实现，点击Run Implementation。

![Vivado实现步骤](assets/vivado_implementation.png)

#### 6. 烧写（Program and Debug）
综合通过后，即可生成bit文件，点击Program and Debug->Generate Bitstream。

![Vivado烧写步骤](assets/vivado_program.png)

## 工具选择建议

### 初学者推荐
- **仿真工具**：Mentor Modelsim（Windows友好，图形界面）
- **综合工具**：Vivado（FPGA）或 Design Compiler（ASIC）
- **开发环境**：Vivado（FPGA）或 命令行脚本（ASIC）

### 进阶用户
- **仿真工具**：Synopsys VCS（Linux，脚本化）
- **综合工具**：Design Compiler + 自定义脚本
- **分析工具**：PrimeTime（时序分析）、PrimeTime PX（功耗分析）

## 学习资源

### 官方文档
- [Vivado Design Suite User Guide](https://www.xilinx.com/support/documentation/sw_manuals/xilinx2020_1/ug973-vivado-release-notes-install-license.pdf)
- [Synopsys Design Compiler User Guide](https://www.synopsys.com/support/training/rtl-synthesis/design-compiler.html)

### 在线教程
- Xilinx官方培训视频
- Synopsys在线培训课程
- 各种技术博客和论坛

### 实践建议
1. **从简单开始**：先掌握基本的仿真和综合流程
2. **多做练习**：通过实际项目加深理解
3. **阅读报告**：仔细分析综合报告和时序报告
4. **脚本化**：学会编写自动化脚本提高效率

---

*掌握这些工具是进行硬件设计的基础，建议结合实际项目进行练习。*
