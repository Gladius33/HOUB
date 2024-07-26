import Category from '../models/Category.js';

export async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function createCategory(req, res) {
  const { name, description } = req.body;

  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    category = new Category({ name, description });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function editCategory(req, res) {
  const { name, description } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    category.name = name;
    category.description = description;
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function deleteCategory(req, res) {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    await category.remove();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const initialCategories = [
  { name: 'SEO', description: 'Search Engine Optimization' },
  { name: 'Backend Development', description: 'Development of server-side logic' },
  { name: 'Frontend Development', description: 'Development of client-side applications' },
  { name: 'Mobile Development', description: 'Development of mobile applications' },
  { name: 'Data Science', description: 'Data analysis and machine learning' },
  { name: 'Cybersecurity', description: 'Security testing and vulnerability assessment' },
  { name: 'Content Writing', description: 'Creation of written content for websites, blogs, etc.' },
  { name: 'Graphic Design', description: 'Design of visual content' },
  { name: 'Digital Marketing', description: 'Marketing of products or services using digital channels' },
  { name: 'Blockchain Development', description: 'Development of blockchain technologies and applications' },
  { name: 'Cloud Computing', description: 'Services related to cloud infrastructure and services' },
];

export async function initializeCategories(req, res) {
  try {
    await Category.insertMany(initialCategories);
    res.json({ msg: 'Categories initialized' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export default {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
  initializeCategories

};