import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { CategoryPage } from '../pages/CategoryPage';
import { ToolPage } from '../pages/ToolPage';
import { allTools, categories } from '../data/toolRegistry';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        {/* Categories */}
        {categories.map(category => (
          <Route
            key={category.id}
            path={`category/${category.slug}`}
            element={<CategoryPage category={category} />}
          />
        ))}

        {/* Tools */}
        {allTools.map(tool => (
          <Route
            key={tool.id}
            path={tool.route}
            element={<ToolPage tool={tool} />}
          />
        ))}

        {/* About */}
        <Route path="about" element={<AboutPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
